

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
