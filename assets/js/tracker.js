


async function sendEvent(event){
    const date = new Date();
    event = {
        'timestamp': date.toISOString(),
        ...event
    }
    const headers = {
        'Authorization': `Bearer p.eyJ1IjogIjI0OTA1NjBmLWJkYTEtNDE0OC1iZmViLTNmYWEzODMzZGEzMyIsICJpZCI6ICJmMDNmYWQyYS0xZWY4LTRhYzMtYmI2OC0wYzdiODMyYzY2MWMifQ.l1yWCn_cdhQ3GFqxUmReB2M_ekU5iR3cMtij_DsQYjg`,
    }
    const rawResponse = await fetch('https://api.tinybird.co/v0/events?name=events_web_json', {
        method: 'POST',
        body: JSON.stringify(event),
        headers: headers,
    });
    const content = await rawResponse.json();
    console.log(content)
}


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

  window[global_function_name] = async function(user_events) {
    var ev = [dateFormatted(), session, account_name, user_cookie, document.location.href, navigator.userAgent].concat(Array.prototype.slice.call(arguments))
   
    var ev = {
      session, account_name, user_cookie, href: document.location.href, userAgent: navigator.userAgent
    }
    await sendEvent({...ev, ...user_events})
  };
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
_tracker({'event': 'pageload', 'referrer': document.referrer})

window.addEventListener('click', function (e) {
  _tracker({'event': 'click', 'x': e.x, 'y': e.y, 'xpath': e.path.map(function (el) {
    if (el.nodeName) {
      return el.nodeName + (el.className ? '.' + el.className : '');
    }
    return "root"
  }).reverse().join('/'), src: e.srcElement.href ? new String(e.srcElement.href): ''})
})
