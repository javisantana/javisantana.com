

var addEvent = function (el, type, fn) {
  if (el.addEventListener)
    el.addEventListener(type, fn, false);
  else
    el.attachEvent('on'+type, fn);
};

var extend = function(obj,ext){
  for(var key in ext)
    if(ext.hasOwnProperty(key))
      obj[key] = ext[key];
  return obj;
};

window.fitText = function (el, kompressor, options) {

  var settings = extend({
    'minFontSize' : -1/0,
    'maxFontSize' : 1/0
  },options);

  var fit = function (el) {
    var compressor = kompressor || 5;

    var resizer = function () {
      el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
    };

    // Call once to set.
    resizer();

    // Bind events
    // If you have any js library which support Events, replace this part
    // and remove addEvent function (or use original jQuery version)
    addEvent(window, 'resize', resizer);
    addEvent(window, 'orientationchange', resizer);
  };

  if (el.length)
    for(var i=0; i<el.length; i++)
      fit(el[i]);
  else
    fit(el);

  // return set of elements
  return el;
};

// TB send event
async function sendEvent(event){
    const date = new Date();
    event = {
        'timestamp': date.toISOString(),
        ...event
    }
    const headers = {
        'Authorization': `Bearer p.eyJ1IjogImM4YWY4Zjg2LWQzY2EtNGRhNy1iMWVhLWUyNmMxN2ViNGI0OSIsICJpZCI6ICJlZTM1MjMwZi0xYmZlLTQ4N2MtOTRjNC1jYjA1NjExM2Y3NDYifQ.GBO3WIIltxMDskzBA6HUaBoR17vm4kQVglgfB8Ew8lk`,
    }
    const rawResponse = await fetch('https://api.tinybird.co/v0/events?name=gps_tracker', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: headers,
    });
    const content = await rawResponse.json();
}

function mercator_project(ll) {
    var D2R = Math.PI / 180,
        A = 6378137.0,
        MAXEXTENT = 20037508.342789244;
    var xy = [
        A * ll[0] * D2R,
        A * Math.log(Math.tan((Math.PI*0.25) + (0.5 * ll[1] * D2R)))
    ];
    // if xy value is beyond maxextent (e.g. poles), return maxextent.
    (xy[0] > MAXEXTENT) && (xy[0] = MAXEXTENT);
    (xy[0] < -MAXEXTENT) && (xy[0] = -MAXEXTENT);
    (xy[1] > MAXEXTENT) && (xy[1] = MAXEXTENT);
    (xy[1] < -MAXEXTENT) && (xy[1] = -MAXEXTENT);
    return xy;
};

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function flatout_init() {
    var session = uuidv4()
    let user_id = localStorage.getItem('user_id')
    if (!user_id) {
        user_id = uuidv4()
        localStorage.setItem('user_id', user_id)
    }
    return [session, user_id]
}

var RACETRACKS = [
  {
    name: 'Los arcos',
    start:
    [
      [-2.168215, 42.559169],
      [-2.167767, 42.559307]
    ]
  }
]

const Flatten = window["@flatten-js/core"];
const {point, circle, segment} = Flatten;

var THRESHOLD_SPEED = 20;

class Session {

  constructor() {
    this.positions = [];
    this.inLap = false;
    this.startingPos = null;
    this.laps = []
  }

  newPos(ts, lonlat, speed) {
    var xy = mercator_project(lonlat)
    this.positions.push({ts: ts, pos: xy});
    var len = this.positions.length

    if (len < 2)
      return;

    // at least two positions and speed over 20kmh
    if (speed*3.6 > THRESHOLD_SPEED) {

      let t0 = this.positions[len - 2].ts
      let t1 = this.positions[len - 1].ts
      let p0 = new Flatten.Point(this.positions[len - 2].pos)
      let p1 = new Flatten.Point(this.positions[len - 1].pos)
      let carTrace = new Flatten.Segment(p0, p1);

      for (var track of RACETRACKS) {
        let trackStart = new Flatten.Segment(
          new Flatten.Point(mercator_project(track.start[0])),
          new Flatten.Point(mercator_project(track.start[1]))
        )

        var intersection = carTrace.intersect(trackStart);


        if (intersection.length) {

          var d0 = intersection[0].distanceTo(p0)[0];
          var d1 = intersection[0].distanceTo(p1)[0];
          var t = d0 / (d0 + d1)

          var currentPos = {
            ts: t0 + t * (t1 - t0),
            pos: intersection
          }

          if (this.inLap) {
            this.laps.push({
              start: this.startingPos,
              end: currentPos
            })
          } else {
            this.startingPos = currentPos
            this.inLap = true;
          }
        }
      }
    }
  }
}

function selfTest() {
  var session = new Session();
  session.newPos(0, [-2.168040, 42.559179], 30);
  session.newPos(1000, [-2.168209, 42.559467], 30);
  console.assert(session.inLap)
  session.newPos(2000, [-2.165811, 42.560299], 30);
  console.assert(session.inLap)
  console.assert(session.laps.length == 0)
  session.newPos(3000, [-2.164577, 42.558971], 30);
  console.assert(session.inLap)
  console.assert(session.laps.length == 0)
  session.newPos(4000, [-2.168040, 42.559179], 30);
  session.newPos(5000, [-2.168209, 42.559467], 30);
  console.assert(session.inLap)
  console.assert(session.laps.length == 1)
  console.assert(session.laps[0].end.ts > 4000)
  console.assert(session.laps[0].end.ts < 5000)
}

selfTest();

