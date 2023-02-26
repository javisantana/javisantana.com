

class Point {
  constructor(x, y)  {
    this.x = x;
    this.y = y;
  }

  distTo(b) {
    return Math.hypot(this.x - b.x, this.y - b.y)
  }

}

// https://gist.github.com/gordonwoodhull/50eb65d2f048789f9558
class Segment {
  constructor(p0, p1)  {
    this.p0 = p0;
    this.p1 = p1;
  }

  intersect(line) {
    const p0 = this.p0, p1 = this.p1,
          p2 = line.p0, p3 = line.p1
    const s10_x = p1.x - p0.x, s10_y = p1.y - p0.y,
          s32_x = p3.x - p2.x, s32_y = p3.y - p2.y
    const denom = s10_x * s32_y - s32_x * s10_y
    if(denom == 0) return undefined // collinear
    const s02_x = p0.x - p2.x,
          s02_y = p0.y - p2.y
    const s_numer = s10_x * s02_y - s10_y * s02_x
    if(s_numer < 0 == denom > 0) return undefined // no collision
    const t_numer = s32_x * s02_y - s32_y * s02_x
    if(t_numer < 0 == denom > 0) return undefined // no collision
    if(s_numer > denom == denom > 0 || t_numer > denom == denom > 0) return undefined // no collision
    const t = t_numer / denom
    return new Point(p0.x + (t * s10_x), p0.y + (t * s10_y))
  }
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function mercator_project(lonlat) {
    var D2R = Math.PI / 180,
        A = 6378137.0,
        MAXEXTENT = 20037508.342789244;
    var xy = new Point(
        A * lonlat.x * D2R,
        A * Math.log(Math.tan((Math.PI*0.25) + (0.5 * lonlat.y * D2R)))
    );
    // if xy value is beyond maxextent (e.g. poles), return maxextent.
    (xy.x > MAXEXTENT) && (xy.x = MAXEXTENT);
    (xy.x < -MAXEXTENT) && (xy.x = -MAXEXTENT);
    (xy.y > MAXEXTENT) && (xy.y = MAXEXTENT);
    (xy.y < -MAXEXTENT) && (xy.y = -MAXEXTENT);
    return xy
}

var THRESHOLD_SPEED = 20;

class Session {

  constructor(tracks) {
    this.positions = [];
    this.inLap = false;
    this.startingPos = null;
    this.track = null;
    this.laps = []
    this.lapId = ''
    this.tracks = tracks
  }

  currentLapId() { return this.lapId }

  currentLapTime() {
    if (this.inLap) {
      var len = this.positions.length
      let last = this.positions[len - 1].ts;
      return last - this.startingPos.ts;
    }
  }

  lastLapTime() {
      var len = this.laps.length
      let last = this.laps[len - 1]
      return last.end.ts - last.start.ts;
  }

  lapsNumber() {
    return this.laps.length
  }

  // return the delta with best for the last lap
  lastDeltaWithBest() {
    if (this.laps.length === 0) {
      return null
    }
    var best = Number.MAX_SAFE_INTEGER;
    for(var lap of this.laps.slice(0, -1)) {
      var time = lap.end.ts - lap.start.ts
      if (time < best) {
        best = time;
      }
    }
    return this.lastLapTime() - best;

  }

  bestLap() {
    var bestLap = null;
    if (this.laps.length === 0) {
      return null
    }
    var best = Number.MAX_SAFE_INTEGER;
    for(var lap of this.laps) {
      var time = lap.end.ts - lap.start.ts
      if (time < best) {
        best = time;
        bestLap = lap;
      }
    }
    return bestLap;
  }

  bestLapTime() {
    if (this.laps.length === 0) {
      return null
    }
    var lap = bestLap()
    return lap.end.ts - lap.start.ts
  }

  newPos(ts, lonlat, speed) {
    var xy = mercator_project(new Point(lonlat[0], lonlat[1]))
    this.positions.push({ts: ts, pos: xy});
    var len = this.positions.length

    if (len < 2)
      return []

    // speed over 20kmh
    if (speed*3.6 > THRESHOLD_SPEED) {

      let t0 = this.positions[len - 2].ts
      let t1 = this.positions[len - 1].ts
      let p0 = this.positions[len - 2].pos
      let p1 = this.positions[len - 1].pos
      let carTrace = new Segment(p0, p1);

      for (var track of this.tracks) {
        let trackStart = new Segment(
          mercator_project(track.start[0]),
          mercator_project(track.start[1])
        )

        var intersection = carTrace.intersect(trackStart);

        var triggerEvents = []

        if (intersection !== undefined) {
          this.track = track;
          var d0 = intersection.distTo(p0)
          var d1 = intersection.distTo(p1)
          var t = d0 / (d0 + d1)

          var currentPos = {
            ts: Math.floor(t0 + t * (t1 - t0)),
            pos: intersection
          }

          if (this.inLap) {
            this.laps.push({
              start: this.startingPos,
              end: currentPos
            })
            //TODO: manage non closed tracks
            this.startingPos = currentPos;
            // mark the end
            triggerEvents.push({
              type: 'lap_end',
              currentLap: this.lapId,
              ...currentPos
            })
            this.lapId = uuidv4()
            // mark the start
            triggerEvents.push({
              type: 'lap_start',
              currentLap: this.lapId,
              ...currentPos
            })
          } else {
            this.startingPos = currentPos;
            this.inLap = true;
            this.lapId = uuidv4()
            triggerEvents.push({
              type: 'lap_start',
              currentLap: this.lapId,
              ...currentPos
            })
          }

          return triggerEvents;
        }
      }
    }
    return []
  }
}

var RACETRACKS = [
  {
    name: 'Los arcos',
    start:
    [
      new Point(-2.168215, 42.559169),
      new Point(-2.167767, 42.559307)
    ]
  }/*
  {
    name: 'Kotar',
    start: [
      new Point(-3.583358, 41.791305),
      new Point(-3.583682, 41.791313)
    ]
  },
  {
    name: 'Cheste',
    start: [
      new Point(-0.631284, 39.483813),
      new Point(-0.630794, 39.483251)
    ]
  }*/
]

function selfTest() {
  var session = new Session(RACETRACKS);
  session.newPos(0, [-2.168040, 42.559179], 30);
  session.newPos(1000, [-2.168209, 42.559467], 30);
  console.assert(session.inLap, "in lap")
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

