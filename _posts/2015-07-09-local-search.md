---
layout: blog3
published: true
---

# Local search with PostGIS

I was talking with some friends about a geo problem they have:

> Given a set of elements with a position and a name in a database give me the N closest to a certain point that
> match some pattern on the name.

So imagine you have openstreetmap database and want to find the first 300 banks and bars closer to
Madrid city center (pretty interesting combination I'd say, in Spain ATMs are in the banks).

So in order to test it I loaded Madrid OSM in a postgres database. I just downloaded the data from [geofabrik site](http://download.geofabrik.de/) and imported using osm2pgsql tool, pretty straightforward.

Then I created some indices for the ``way``and ``amenity`` columns (using full text search stuff)

```
-- gist index for the geometry, full text search for the text
create index on planet_osm_point gist(way);
create index on planet_osm_point using to_tsvector('spanish', amenity)
```

**First try, use Nearest Neighbour search**

Since postgis 2.0 we have Nearest Neighbour search (thanks to CartoDB which founded it) that allows
to use the geospatial index to sort results (read [this blogpost in boundless blog](http://boundlessgeo.com/2011/09/indexed-nearest-neighbour-search-in-postgis/)), so the first try was to order by distance operator [<->](http://postgis.net/docs/geometry_distance_centroid.html) the results from the text filter.

```sql
select way, amenity from planet_osm_point where to_tsvector('spanish', amenity) @@ to_tsquery('ba:*') order by way <->'SRID=900913;POINT(-412661.352370664 4926477.3516323)'::geometry limit 301
```

This takes around 48ms (everything cached). Looking at the explan analyze out of curiosity I
realize spatial index wasn't being used:

```sql
Limit  (cost=23947.86..23948.61 rows=301 width=41) (actual time=48.729..48.780 rows=301 loops=1)
   ->  Sort  (cost=23947.86..24035.30 rows=34976 width=41) (actual time=48.727..48.755 rows=301 loops=1)
         Sort Key: ((way <-> '010100002031BF0D00F8DAD368D52F19C1C324815603CB5241'::geometry))
         Sort Method: top-N heapsort  Memory: 48kB
         ->  Bitmap Heap Scan on planet_osm_point  (cost=1363.07..22333.09 rows=34976 width=41) (actual time=12.120..41.008 rows=17382 loops=1)
               Recheck Cond: (to_tsvector('spanish'::regconfig, amenity) @@ to_tsquery('ba:*'::text))
               ->  Bitmap Index Scan on planet_osm_point_to_tsvector_idx1  (cost=0.00..1354.32 rows=34976 width=0) (actual time=10.889..10.889 rows=17382 loops=1)
                     Index Cond: (to_tsvector('spanish'::regconfig, amenity) @@ to_tsquery('ba:*'::text))
 Total runtime: 48.877 ms
```

I don't fully understand how the postgres planner works but sounds like it might be using a bitmap
and operation both indices. Increasing the limit does not change anything, I though it could change
the selectivity. I tried a search by distance:

```
SELECT way, amenity FROM planet_osm_point 
WHERE
to_tsvector('spanish', amenity) @@ to_tsquery('ba:*') 
AND
st_dwithin(way, 'SRID=900913;POINT(-412661.352370664 4926477.3516323)'::geometry, 500)
```

and I get the desired ``BitmapAnd``:

```
 ...
 ->  BitmapAnd  (cost=1422.90..1422.90 rows=42 width=0) (actual time=14.881..14.881 rows=0 loops=1)
         ->  Bitmap Index Scan on planet_osm_point_index  (cost=0.00..68.32 rows=2121 width=0) (actual time=2.229..2.229 rows=6028 loops=1)
               Index Cond: (way && '010300002031BF0D000100000005000000F8DAD368154F19C1C32481560FC95241F8DAD368154F19C1C3248156F7CC5241F8DAD368951019C1C3248156F7CC5241F8DAD368951019C1C32481560FC95241F8DAD368154F19C1C32481560FC95241'::geometry)
         ->  Bitmap Index Scan on planet_osm_point_to_tsvector_idx1  (cost=0.00..1354.32 rows=34976 width=0) (actual time=12.607..12.607 rows=17382 loops=1)
 ...
```

**Second try, use a recursive query**

But that's not the result I was looking for, I need the first 300 bars and banks closer to my
location, no matter if they are 30km away

So I though about having a kind of python generator, a query that returns results on demand until I
have enough results.

Reading postgres documentation there is a nice trick in CTE documentation, you can do a recursive
query without stop condition that stops where the external query reach the limit.

```sql
WITH RECURSIVE t(osm_id, way, amenity, distance) AS (
  SELECT osm_id, way, amenity, 4800.0 as distance from planet_osm_point 
        WHERE
    to_tsvector('spanish', amenity) @@ to_tsquery('ba:*')
      AND 
    st_dwithin(way, 'SRID=900913;POINT(-412661.352370664 4926477.3516323)'::geometry, 4800)
  UNION ALL
    -- select only one row from the previous iteration to know the distance
    SELECT p.osm_id, p.way, p.amenity, prev.distance * 2 as distance 
    FROM planet_osm_point p , (SELECT distance FROM t LIMIT 1) prev
       WHERE 
    to_tsvector('spanish', p.amenity) @@ to_tsquery('ba:*')
      AND 
    st_dwithin(p.way, 'SRID=900913;POINT(-412661.352370664 4926477.3516323)'::geometry, prev.distance * 2)
      AND not
    st_dwithin(p.way, 'SRID=900913;POINT(-412661.352370664 4926477.3516323)'::geometry, prev.distance)
),
results as  (
    select *, st_distance(way,'SRID=900913;POINT(-412661.352370664 4926477.3516323)'::geometry) as real_dist FROM t limit 300
)
SELECT * FROM results order by real_dist
```

The time for this query is around 48ms so no improvement at all. But that may depend on the number
of iterations it needs to do until fetch all the results. Starting with 300 meters takes 4 loops
since last bar is 2393 meters away form city center.

If it starts the iteration with a bigger radius, like 1500 (2 iterations), the query time is 25ms. If it only needs
to do the fist iteration, it's 18ms which is much better.

So how do we know what would be a good value to start? Hard to say without some density information stats... luckily
postgres has pretty good stats about indices and there are good ways to access it: ``EXPLAIN`` and
``_postgis_selectivity``

```
spain=# explain select 1 FROM planet_osm_point where   to_tsvector('spanish', amenity) @@ to_tsquery('ba:*')       ;
                                              QUERY PLAN
-------------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on planet_osm_point  (cost=1363.07..22245.65 rows=34976 width=0)
   Recheck Cond: (to_tsvector('spanish'::regconfig, amenity) @@ to_tsquery('ba:*'::text))
   ->  Bitmap Index Scan on planet_osm_point_to_tsvector_idx1  (cost=0.00..1354.32 rows=34976 width=0)
         Index Cond: (to_tsvector('spanish'::regconfig, amenity) @@ to_tsquery('ba:*'::text))
(4 rows)
```

Forget everything but ``rows=34976`` that's the stimation of total number of bars and banks in the
whole table (the real count value is 17k but let's see if it's good enough)

In order to know how many points there are in a certain are we can use ``_postgis_selectivity``
function. It's kind of hidden, is what actually postgres stats planner use.

```
select _postgis_selectivity('planet_osm_point', 'way', st_expand('SRID=900913;POINT(-412661.352370664 4926477.3516323)'::geometry, 5000))
 _postgis_selectivity
----------------------
  0.00751143626570702
```

(you can get the same value using EXPLAIN but I like ``_postgis_selectivity``)

So knowing the selectivity (the part of total rows selected by that bbox), the total number of bars
and banks and the total count (1.8M) we can estimate: 

```
total_rows * percentaje_categories * selectivity
1748797 * 0.02 * 0.00751143626570702 ~ 262.0
```

So in 10km area we have an stimation of 262 points, so to get 300 points:

```
density = 262/(10000*10000) // points/m^2
area_to_300 = 300/density
R = sqrt(area_to_300/2*PI);
R -> 4268.93996744354m
```

So using a radius of 4200 meters the query takes ~18ms as it's doing a single iteration. It's
important to say that calculate the stats is almost free, it takes less than 1ms (except total count
that could be precalculated).

Other nice thing about the recursive query is it can be paginated, so you can find 100 results get
the last distance and the next time use that distance to start iterating.

Maybe this case is too simple or have too few points but it's the best approach I found, any idea?










