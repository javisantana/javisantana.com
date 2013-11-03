
function lap() {
}

function distance(p0, p1) {
  var dx = p1.x - p0.x;
  var dy = p1.y - p0.y;
  return Math.sqrt(dx*dx + dy*dy);
}

lap.geoJSONLaps = function (laps) {
  return {
    "type": "FeatureCollection",
    "features": laps.map(function(l) {
        return {
          type: "Feature",
          geometry: lap.geoJSON(l)
        };
    })
  };
};

lap.geoJSON = function (data) {
  return  {
    type: "LineString",
    coordinates: data.points.map(function(p) { return [p.lon, p.lat]; })
  };
}

lap.speed = function(data) {
  return data.points.map(function(p) { 
    return { 
      time: new Date(p.time - data.points[0].time),
      val: +p.vel*3.6 
    }; 
  });
}

lap.time = function(data) {
  return data.times[data.times.length - 1].time - data.times[0].time;
}

lap.map = function(data, attr) {
  return data.points.map(function(p, index) { 
    var total_dist = lap.distance(data);
    var points = data.points.slice(0, index + 1)
    var dist = 0
    for(var i = 1; i < points.length; ++i) {
      dist += distance(points[i].pos, points[i - 1].pos)
    }
    var t = dist/total_dist;
    return { 
      dist: t,
      val: attr(p, points, t)
    }; 
  });
}

lap.distance = function(data) {
  var dist = 0
  var points = data.points;
  for(var i = 1; i < points.length; ++i) {
    dist += distance(points[i].pos, points[i - 1].pos)
  }
  return dist;
}

lap.linear = {};
/**
 * returns linear interpolator dist vs position
 */
lap.linear.pos = function(data) {
  var lat = lap.map(data, function(p, points, t) { 
    return p.lat;
  })
  var lon = lap.map(data, function(p, points, t) { 
    return p.lon;
  })

  return{
    lat: d3.scale.linear()
          .domain(lat.map(function(p) { return p.dist; }))
          .range(lat.map(function(p) { return p.val; })),
    lon: d3.scale.linear()
          .domain(lon.map(function(p) { return p.dist; }))
          .range(lon.map(function(p) { return p.val; }))
  };
};

lap.linear.time = function(data) {
  var points = data.points;
  return {
    lat: d3.scale.linear()
          .domain(points.map(function(d) { return d.time - points[0].time }))
          .range(points.map(function(p) { return p.lat; })),
    lon: d3.scale.linear()
          .domain(points.map(function(d) { return d.time - points[0].time }))
          .range(points.map(function(p) { return p.lon; })),
  };
};

lap.linear.speed = function(data) {
  var points = data.points;
  return {
    speed: d3.scale.linear()
          .domain(points.map(function(d) { return d.time - points[0].time }))
          .range(points.map(function(p) { return p.vel * 3.6; })),
    acel: d3.scale.linear()
          .domain(points.map(function(d) { return d.time - points[0].time }))
          .range(points.map(function(p, i) { 
            return i === 0 ? 0: p.vel - points[i - 1].vel; 
          })),
  };
};

