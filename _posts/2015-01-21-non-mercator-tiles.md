---
layout: blog3
published: true
---

# working with non mercator projections in cartodb

CartoDB provides a way to render tiles in non mercator projection, it's not something we though
about when our Map API was designed but it's possible and works pretty well.

### CartoDB geometry rendering intro

CartoDB stores data in postgres tables using postgis for the geospatial data. I will not explain
this, if you are reading this is because you already know how it works. Tables in CartoDB are
regular tables with some special column names like ``cartodb_id``, ``the_geom`` and
``the_geom_webmercator``

In order to render map tiles CartoDB needs to things:

- SQL query to fetch the data
- CartoCSS style to render

Maps API uses ``the_geom_webmercator`` column by default as geometry source so when a geometry
needs to be rendered you need to call with that name. It also expects that column is projected, no
special SRID is required altough web mercator is for what was designed for.

With that in mind we could tweak Maps API sending a geometry projected in something different than
web mercator, so we can create this cartodb.js example:

```
cartodb.createLayer(map, {
  user_name: 'dev',
  sublayers: [{
    sql: 'select st_transform(the_geom, 32661) as the_geom_webmercator from tm_world_borders_s_11'
    cartocss: '#layer { polygon-fill: #F00; polygon-opacity: 0.3; line-color: #F00; }',
  }]
})
.addTo(map)
```

that would render a map projected in [SRID 32661](http://epsg.io/32661), that's it, it works. The problem is leaflet is
still working with mercator. Luckily it provides a way to change the projection used using
[crs](http://leafletjs.com/reference.html#map-crs)
option in the map.

So aplying the same technique than [Gregor Aisch](https://twitter.com/driven_by_data) describes in [this
post](http://vis4.net/blog/posts/no-more-mercator-tiles/) you can create a CRS that maps the
coordinates from the required projection to mercator (and in the other way around) so you can use
leaflet as you normally do but using a different projection:

```
var map = new L.Map('map', {
  center: center,
  zoom: 2,
  crs: cartodb.proj('+proj=stere +lat_0=90 +lat_ts=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m +no_defs', '32661')
});
cartodb.createLayer(map, {
...
```

it uses an small library I created for this matter,
[cartodb.proj](https://github.com/cartodb/cartodb.proj)

### interaction

CartoDB not only render png tiles, it also does utf grid tiles to provide interaction and this also works as expected. In the following example an infowindow with some data about the countries is included.

```
cartodb.createLayer(map, {
  user_name: 'dev',
  type: 'cartodb',
  sublayers: [{
     sql: 'select area, iso2, st_transform(the_geom, 32661) as the_geom_webmercator from tm_world_borders_s_11 where st_y(st_centroid(the_geom)) > 0',
     cartocss: '#layer { polygon-fill: #F00; polygon-opacity: 0.3; line-color: #F00; }',
     interactivity: 'area, iso2'
  }]
})
.addTo(map)
.done(function(layer) {
    var sub = layer.getSubLayer(0)
    cdb.vis.Vis.addInfowindow(map, sub, ['area', 'iso2'])
    sub.on('featureOver', function(e, ll, pos, data) {
      console.log(data);
    })
});
```

Notice nothing special needs to be added, just cartodb.js code that would work with mercator


## vector features

Leaflet provides a bunch of methods to work with vector features and guess what, they work as
expected so you can use CartoDB SQL API to fetch geometry and render as a GeoJSON layers:


```
// adds polygon for spain
cartodb.SQL({ user: 'dev', format: 'geojson' })
  .execute( "select the_geom from tm_world_borders_s_11 where iso2 = 'ES'")
  .done(function(data) {
      L.geoJson(data).addTo(map);
  })

// adds a marker
L.marker(center).addTo(map);
```

## the working map

<iframe width='100%' height='520' frameborder='0' src='/proj/index.html' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>

# some problems

Some projections don't work well depending on the zone you are showing and that's something you
should expect, most projections are meant to work well only in a concrete region. For example, a
projection ready to show Antartica is not going to work well showing Norway and it will be rendered
with distorsion or it will not even rendered because the projection fails.

In PostGIS some projections fails when you try to render outside a bounding box:

```
db=# select st_transform(st_setsrid(st_makepoint(0, -181), 4326), 2857);
ERROR:  transform: couldn't project point (0 -181 0): latitude or longitude exceeded limits (-14)
```

in order to make it work we can use PostGIS functions
[ST_Intersection](http://postgis.net/docs/RT_ST_Intersection.html), like:

```
SELECT ST_Intersection(the_geom, ST_MakeEnvelope(-180, 0, 180, 90, 4326))
```

in this case we get the geometry in the north side or the earth.

### extra ball

A map I created with CartoDB with some dataset Antartica

<iframe width='100%' height='520' frameborder='0' src='http://team.cartodb.com/u/javi/viz/caeb3646-a307-11e4-92b6-0e853d047bba/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>









