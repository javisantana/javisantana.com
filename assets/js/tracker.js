
var TRACKER_COLUMNS = 15

/**
 * install a tracker for the user
 */
function tracker(token, account_name, global_function_name, host) {
  global_function_name = global_function_name || 'tracker_ga'
  var user_cookie = getCookie('tinybird_track');
  if (!user_cookie) {
    user_cookie = uuidv4();
    setCookie('tinybird_track', user_cookie);
  }
  var session = dateFormatted()
  setInterval(upload_events, 2000);
  var events = JSON.parse(window.localStorage.getItem("events") || '[]')

  function upload_events() {
    if (events.length > 0) {
      tinybird(token, host).datasource('tracker_javisantanacom').append(events).then((err) => {
        if (err && !err.error) {
          events = []
          window.localStorage.setItem("events", '[]')
        }
      })
    }
  }
  tracker.flush = upload_events

  window[global_function_name] = function() {
    var ev = [dateFormatted(), session, account_name, user_cookie, document.location.href, navigator.userAgent].concat(Array.prototype.slice.call(arguments))
    if (ev.length < TRACKER_COLUMNS) {
      ev = ev.concat(Array(TRACKER_COLUMNS - ev.length).fill(''))
    }
    events.push(ev)
  };
  function die() {
    window.localStorage.setItem("events", JSON.stringify(events))
    upload_events()
  }
  window.addEventListener("beforeunload", die)
  window.addEventListener("unload", die, false);
}

/**
 * utility methods
 */

function dateFormatted(d) {
  d = d || new Date()
  return d.toISOString().replace('T', ' ').split('.')[0]
}

function setCookie(name, value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0;i < ca.length; ++i) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

tracker('p.eyJ1IjogIjI0OTA1NjBmLWJkYTEtNDE0OC1iZmViLTNmYWEzODMzZGEzMyIsICJpZCI6ICI3ZTc1ZTI1NC02MjJkLTRiMTctYjE1MC02NjVkMmUyYjZkZjUifQ.IzKCxRueVOJij1nZtD5GNyF1Cn5cqQx9TpaerqrivKA', 'main', '_tracker', 'https://api.tinybird.co')
_tracker('pageload')

window.addEventListener('click', function (e) {
  _tracker('click', e.x, e.y, e.path.map(function (el) {
    if (el.nodeName) {
      return el.nodeName + (el.className ? '.' + el.className : '');
    }
    return "root"
  }).reverse().join('/'), e.srcElement.href ? new String(e.srcElement.href): '')
 // exiting
  if (e.srcElement.href) {
    tracker.flush()
  }
})
