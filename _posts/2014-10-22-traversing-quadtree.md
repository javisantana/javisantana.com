---
layout: blog3
published: true
---

## traversing webmercator quadtree with SQL

One of the things I'm doing lately is analyze datasets in order to improve rendering speed in CartoDB and see how postgres performs. Unfortunately (or not, who knows) I'm don't know so much about geospatial indices so I try to analyze using a bunch of SQL queries with the help of explain analyze.

On our tiler we have a fixed number of mapnik workers that can run at the same time (obviously) and setting up a new worker to render an empty tile is too expensive or at least more than executing a SQL query to see if there is data in this tile.

I was thinking about how would be to generate a index to khow, given a SQL query, what are the empty tiles. One of the thinks that came to my mind was the recursive WITH postgres statement. At the end webmercator is based on a quadtree so we can iterate it using recursion. This is the query I wrote:

```
    WITH RECURSIVE t(x, y, z, e) AS (
      -- root node (0, 0, 0)
        SELECT 0, 0, 0, exists(select 1 from ships where the_geom_webmercator && CDB_XYZ_Extent(0, 0, 0))
      UNION ALL
        -- coordinate for the children
        SELECT x*2 + xx, y*2 + yy, z+1,
               exists(select 1 from ships where the_geom_webmercator && CDB_XYZ_Extent(x*2 + xx, y*2 + yy, z+1)) from t,
               -- iterate over 4 children
               (VALUES (0, 0), (0, 1), (1, 1), (1, 0)) as c(xx, yy) 
               -- only for tiles with geometry and up to zoom level 8
               where e AND z < 8
    )
    SELECT z, x, y FROM t where e
```

([`CDB_XYZ_Extent`](https://github.com/CartoDB/cartodb-postgresql/blob/master/scripts-available/CDB_XYZ.sql#L34) method returns the bbox for the tile (x, y, z))

It takes 2.8 seconds on my laptop for a dataset distributed all over the world with ~800k points

This generates a table where you can lookup if a tile should be rendered.

Another similar approach is to analyze what tiles you should fetch in order to not retrieve too much information (lets say more than 4k points) but not query the database for tiles with a few points when you can use some parent tile to render (and use cache for that). The SQL query is similar, the only thing that changes is the ``count(*)``

```
 WITH RECURSIVE t(x, y, z, e) AS (
        SELECT 0, 0, 0, (select count(*) from ships where the_geom_webmercator && CDB_XYZ_Extent(0, 0, 0))
      UNION ALL
        SELECT x*2 + xx, y*2 + yy, z+1, (select count(*) from ships where the_geom_webmercator && CDB_XYZ_Extent(x*2 + xx, y*2 + yy, z+1)) from t, (VALUES (0, 0), (0, 1), (1, 1), (1, 0)) as c(xx, yy) where e > 4000 AND z < 17
    )
    SELECT z, x, y, e FROM t where e > 0
```

notice in this case I raised the limit to 17, the recursion in the case stops before due the number of points, there are still 37 tiles with more than 4k points tho. It takes 9.8 seconds to generate for the same dataset. If we increase the number of points to 64k the time is reduced to a half.

I also created a map to see the quadtree in action:

<iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/u/javi/viz/f797827c-58f6-11e4-83e0-0e018d66dc29/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>







