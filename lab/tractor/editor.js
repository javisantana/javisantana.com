
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

function Editor(el, model) {
    var self = this;
    self.el = el;
    self.part = model;
    self.old = null;
    self.test_instance = null;
    self.object_to_add = 'point';

    el.addEventListener("click", function(e) {
        var mouse_pos = vec2(e.offsetX, e.offsetY);
        switch(self.object_to_add) {
          case 'wheel':
            self.add_wheel(self.el_to_world(mouse_pos));
            break;

          case 'motor':
            self.add_wheel(self.el_to_world(mouse_pos), 50);
            break;

          case 'point':
            self.add_point(self.el_to_world(mouse_pos));
            break;
        }
        self.object_to_add = 'point';

    });

    $('play').onclick = function() {
      if(self.test_instance) {
        self.test_instance = null;
      } else {
        self.test_instance = ParticleSystem.from_json(self.part.to_json())
      }
    }
    $('save').onclick = function() {
        var m = localStorage.getItem('machines');
        if(m === null) {
          localStorage.setItem('machines', JSON.stringify({
            models:[]
          }));
        }
        m = JSON.parse(localStorage.getItem('machines'));
        m['models'].push(self.part.to_json());
        console.log(self.part.to_json());
    }
    $('wheel').onclick = function() {
      self.object_to_add = 'wheel';
    }
    $('motor').onclick = function() {
      self.object_to_add = 'motor';
    }
}

Editor.prototype.add_wheel = function(p, m) {
  wheel(p, this.part, 25, 7, m);
}
Editor.prototype.add_buttons = function() {
}

Editor.prototype.el_to_world = function(v) {
  var self = this;
  return vec2(v.x - self.el.width*0.5, -v.y + self.el.height*0.5);
}

/**
 * return the index of point if is near mouse click
 */
Editor.prototype.clicked_on_point = function(v) {
  var idx = -1;
  this.part.m_x.forEach(function(p, i) {
      if(sub(v, p).length() < 10) {
        idx = i;
      }
  });
  return idx;

}
Editor.prototype.add_point = function(v) {
  var self = this;
  var existing = self.clicked_on_point(v);
  if(existing >= 0) {
    if(self.old != null) {
      self.part.add_constrait(self.old, existing);
      self.old = null;
    } else {
      self.old = existing;
    }
  } else {
     self.part.add(v);
  }
}



