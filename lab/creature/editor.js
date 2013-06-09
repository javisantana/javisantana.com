
function wheel(pos, part, r, points, m) {
    //center
    var center = part.add(pos);
    for(var i = 0; i < points; ++i) {
        var angle = 2*Math.PI*i/points;
        part.add(add(pos, mul(r, vec2(Math.cos(angle), Math.sin(angle)))))
    }
    if(m) {
      part.add_constrait(center, center + 1, m);
    }
    for(var i = 0; i <points; ++i) {
        part.add_constrait(center, center + 1 + i);
        part.add_constrait(center + 1 + i, center + 1 + (i+1)%points);
    }
}
var $ = function (e) {
  return document.getElementById(e);
}

function dragger(el, startdrag, drag, dragend,click, move) {

    var self = this;
    var dragging = false;
    var x, y;
    var _x, _y;

    function _get_mouse_pos(e) {
        if (e.touches) {
            var p = e.touches[0];
            _x = p.pageX;
            _y = p.pageY;
        } else {
            _x = e.clientX;
            _y = e.clientY;
        }
        _x -= el.offsetLeft;
        _y -= el.offsetTop;
    }

    el.ontouchstart = el.onmousedown = function(e) {
        dragging = true;
        _get_mouse_pos(e);
        x = _x;
        y = _y;
        startdrag && startdrag(x, y);
    };

    el.ontouchmove = el.onmousemove = function(e) {
        var xx, yy;
        _get_mouse_pos(e);
        xx = _x;
        yy = _y;
        move && move(xx, yy);
        if(!dragging) return;
        drag && drag(xx - x, yy - y);
        return false;
    };

    el.ontouchend = el.onmouseup = function(e) {
        _get_mouse_pos(e);
        xx = _x;
        yy = _y;
        if(xx - x == 0 && yy - y == 0) {
          click && click(xx, yy);
        } else {
          dragend && dragend(xx, yy, xx - x, yy - y);
        }
        dragging = false;
    };
}


function Editor(el, overlay_canvas, model) {
    var self = this;
    self.time = 0;
    self.tutorial = 0;
    self.el = el;
    self.part = model;
    self.old = null;
    self.test_instance = null;
    self.object_to_add = 'point';
    self.dragging_obj = null;

    self.overlay_canvas = overlay_canvas;
    self.overlay_ctx = self.overlay_canvas.getContext('2d');
    self.overlay_ctx.translate(self.overlay_canvas.width/2, self.overlay_canvas.height/2);
    self.overlay_ctx.fillStyle = '#000';

    var click = function(x, y) {
        //var mouse_pos = vec2(e.offsetX, e.offsetY);
        var mouse_pos = vec2(x, y);
        switch(self.object_to_add) {
          case 'wheel':
            self.add_wheel(self.el_to_world(mouse_pos));
            break;

          case 'spring':
            self.add_spring(self.el_to_world(mouse_pos));
            break;

          case 'motor':
            self.add_wheel(self.el_to_world(mouse_pos), 100);
            break;

          case 'point':
            self.add_point(self.el_to_world(mouse_pos));
            break;
        }
        self.object_to_add = 'point';
        //e.preventDefault();
        return false;

    };
    var mousedown = function(x, y) {
      var mouse_pos = vec2(x, y);
      var v  = self.el_to_world(mouse_pos);
      var existing = self.clicked_on_point(v);
      if(existing >= 0) {
        self.dragging_obj = existing;
        self.pos_obj = self.part.m_x[existing].clone();
      }
    };

    var mousedrag = function(x, y) {
      if(self.dragging_obj != null) {
        self.part.change_pos(self.dragging_obj, add(vec2(x,-y), self.pos_obj));
      } else {
      }
    };

    var mousemove = function(x, y) {
        var mouse_pos = vec2(x, y);
        var v  = self.el_to_world(mouse_pos);
        self.mouse_pos = v;
        var existing = self.clicked_on_point(v);
        if(existing >= 0) {
          var p = self.part.m_x[existing];
          self.hover = p;
        } else {
          self.hover = null;
        }
    }

    var mouseup = function(x, y) {
      console.log('mouseup');
        self.dragging_obj = null;
    };

    var dg = new dragger(self.overlay_canvas, mousedown, mousedrag, mouseup, click, mousemove);

    $('play').onclick = function(e) {
      if(self.test_instance) {
        self.test_instance = null;
      } else {
        self.test_instance = ParticleSystem.from_json(self.part.to_json())
      }
      e.preventDefault();
      return false;
    }
    $('save').onclick = function(e) {
        var d = self.part.to_json();
        location.hash = '#' + d;
        console.log(location.hash.length);
        console.log(d.length);
        return false;
    }
    $('wheel').onclick = function(e) {
      self.object_to_add = 'wheel';
      e.preventDefault();
      return false;
    }
    $('motor').onclick = function(e) {
      self.object_to_add = 'motor';
      e.preventDefault();
      return false;
    }
    $('spring').onclick = function(e) {
      self.object_to_add = 'spring';
      e.preventDefault();
      return false;
    }
}

Editor.prototype.update = function(dt) {
  this.time += dt;
}

Editor.prototype.render = function() {
    var self = this;
    var ctx = self.overlay_ctx;
    self.overlay_canvas.width = self.overlay_canvas.width;
    ctx.translate(self.overlay_canvas.width/2, self.overlay_canvas.height/2);
    //self.overlay_ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.strokeStyle = 'rgba(200, 20, 20, 1)';
    ctx.lineWidth = 1;
    if(self.hover) {
      var S = 7;
      ctx.strokeRect(self.hover.x - S, -self.hover.y - S, S=2*S, S);
    }
    if(self.old != null) {
      var p = self.part.m_x[self.old];
      var S = 7;
      ctx.strokeStyle = 'rgba(20, 200, 20, 1)';
      ctx.strokeRect(p.x - S, -p.y - S, S=2*S, S);

      ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
      if(self.hover) {
        ctx.strokeStyle = 'rgba(20, 200, 20, 0.4)';
      }
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(p.x, -p.y);
      ctx.lineTo(self.mouse_pos.x, -self.mouse_pos.y);
      ctx.stroke();
    }

    this.render_tutorial();

}

Editor.prototype.render_tutorial = function() {
    var pos_tut = [
      [0, -10],
      [-50, -100],
      [0, -10],
      [50, -100],
      [0, -10]
    ];
    var t = Math.cos(4*this.time) + 1.0;
    ctx.strokeStyle = 'rgba(200, 20, 20,' + (0.6 + t/2) + ')';
    ctx.lineWidth = 4;
    var S = t*4;
    //ctx.strokeRect(, S=2*S, S);
    var p = pos_tut[this.tutorial];
    ctx.beginPath();
    ctx.arc(p[0], p[1], S, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
}

Editor.prototype.add_wheel = function(p, m) {
  wheel(p, this.part, 25, 7, m);
}

Editor.prototype.add_spring= function(pos) {
  var i0 = part.add(pos)
  var i1 = part.add(add(pos, vec2(30, 0)));
  part.add_constrait(i0, i1, null, 1);
}
Editor.prototype.add_buttons = function() {
}

Editor.prototype.el_to_world = function(v) {
  var self = this;
  var _p = self.el.getBoundingClientRect()
  return vec2(-_p.left + v.x - self.el.width*0.5, _p.top -v.y + self.el.height*0.5);
}

/**
 * return the index of point if is near mouse click
 */
Editor.prototype.clicked_on_point = function(v) {
  var idx = -1;
  this.part.m_x.forEach(function(p, i) {
      if(sub(v, p).length() < 15) {
        idx = i;
      }
  });
  return idx;
}

Editor.prototype.startTutorial = function() {
  self.part.add(vec2(-50, 100 ))
  self.part.add(vec2(50, 100 ));
  self.part.add_constrait(0, 1);
}

Editor.prototype.add_point = function(v) {
  var self = this;
  var existing = self.clicked_on_point(v);
  if(existing >= 0) {
    if(self.old != null) {
      self.part.add_constrait(self.old, existing);
      self.old = null;
      self.tutorial++;
    } else {
      self.old = existing;
      self.tutorial++;
    }
  } else {
     self.part.add(v);
     self.tutorial++;
  }
}



