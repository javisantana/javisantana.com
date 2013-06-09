
/**
 * math
 **/
G = {};
(function() {

  // vec2
  function vec2(x, y) { this.x = x; this.y = y; }
  function madd(v, m, a) { v.x += m*a.x; v.y += m*a.y; }
  function mov(v, a) { v.x = a.x; v.y = a.y; }
  function add(a, b) { return new vec2(a.x + b.x, a.y + b.y);}
  function sub(a, b) { return new vec2(a.x - b.x, a.y - b.y);}
  function mul(a, b) { return new vec2(a*b.x, a*b.y);}
  function length(a) { return Math.sqrt(a.x*a.x + a.y*a.y);}
  function norm(b) { return mul(1.0/length(b), b) };
  function clone(a) { return new vec2(a.x, a.y); }
  function v2(x, y) { return new vec2(x, y);}
  function rot(v, ang) {
    var c = Math.cos(ang);
    var s = Math.sin(ang);
    return v2(c*v.x - s*v.y, c*v.y + s*v.x);
  }


  // 
  // game controller
  //
  var controls = {
      left: false,
      right: false,
      fire: false,
      up: false,
      down: false
  };
    
  function key(e, w) {
      if(e.keyCode == 38) {      controls.up= w; }
      else if(e.keyCode == 40) { controls.down = w; }
      else if(e.keyCode == 37) { controls.left = w; } 
      else if(e.keyCode == 39) { controls.right= w; } 
      else if(e.keyCode == 32) { controls.fire = w; }
  };
  window.addEventListener('keyup', function(e) { key(e, false); });
  window.addEventListener('keydown', function(e) { key(e, true);});






  //
  // entities
  // 
  var Entities = function(remove_callback) {
      this.ent = [];
      this.remove_callback = remove_callback;
  }
  Entities.prototype.add = function(b) { this.ent.push(b); return b; }
  Entities.prototype.update = function(dt) {
      var b = this.ent;
      var len = b.length;
      for(var i = 0; i < len; ++i) {
          if(!b[i].update(dt)) {
              var el = b.splice(i, 1)[0]
              if(this.remove_callback)
                  this.remove_callback(el); 
              len -= 1;
              i-=1;
          }
      }
  };
  Entities.prototype.render = function(ctx) {
      var b = this.ent;
      for(var i = 0; i < b.length; ++i) { b[i].render(ctx); }
  };
  entities = new Entities();

  function Entity(e) { 
    e.pos = e.pos || v2(0, 0); 
    e.update = e.update || function() { return true;};
    return e;
  }
  function Entities(n, e) { 
    function ctor() {};
    ctor.prototype = e;
    function _e() {
        this.pos = v2(0, 0);
    };
    _e.prototype = new ctor();
    var ents = []
    for(var i = 0; i < n; ++i) {
      ents.push(new _e());
    }
    return ents;
  }


  //
  // layer
  //
  function Layer(dynamic) {
    var canvas = document.createElement('canvas');
    var w = canvas.width = G.w;
    var h = canvas.height = G.h;
    var ctx = canvas.getContext('2d');
    this.clear = function() {
      canvas.width = canvas.width;
      ctx.translate(w>>1, h>>1);
    }
    this.canvas = canvas;
    this.ctx = ctx;
    this.dynamic = dynamic === undefined ? true: dynamic;
    G.el.appendChild(canvas);
    G.layers.push(this);
  }

  function g(el, w, h, _init, _frame) {
    G.el = el;
    G.layers = [];
    G.w = w;
    G.h = h;

    el.style.width = w + "px";
    el.style.height = h + "px";

    G.background = new G.Layer();
    _init();
    G._frame = _frame;
    frame(loop);
  }

  var frame = function(fn) { setTimeout(fn, 16); }
  function loop() {
    for(var i = 0; i < G.layers.length; ++i) {
      var lyr = G.layers[i];
      if(lyr.dynamic) {
        lyr.clear();
      }

      G._frame();
      entities.update(0.1);
      entities.render(lyr.ctx);
    }
    frame(loop);
  }
  
  G.g= g;

  G.controls = controls;
  G.v2 = v2;
  G.vec2 = vec2;
  G.entities = entities;
  G.Entity = Entity;
  G.Entities = Entities;
  G.Layer = Layer;

})();
