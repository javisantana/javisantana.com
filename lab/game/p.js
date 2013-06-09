
var G = (function() {
    var max = Math.max;
    var min = Math.min;


math = {

  seed: 1,

  linear: function (a, b, t) {
    return a + (b - a)*t;
  },

  smoothstep: function(a, b,t) {
    if(t < a) 
      return 0.0;
    if(t > b) 
      return 1.0;
    t = (t-a)/(b-a);
    return t*t*(3.0 - 2.0*t);
  },

  white: function(i) {
    return this.rand_int(i);
  },

  rand_int: function(x) {
      /*x += this.seed;
      x = (x<<13) ^ x;
      return ( 1.0 - ( (x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
      */
      /**x = this.seed;
      this.seed = x = (x<<13)^x;
      return (((x * (x * x * 15731 + 789221) + 1376312589) % 2147483648) / 2147483648.0);
      */
      var next = x + this.seed;
      next = (next <<3)^next;
      next = next * 1103515245 + 12345;
      return ((next/65536) % 32768)/32768;
    //return 0.5*Math.cos(i) + 0.5
  },

  rand01: function() {
    var seed = this.seed;
    var multiplier = 1664525
    var modulo = 4294967296
    var offset = 1013904223
    seed = (multiplier*seed + offset) % modulo;
    this.seed = seed;
    return this.seed/modulo;
    //next = next * 1103515245 + 12345;
    //this.seed = next = ((next>>0)%4294967296)>>0;
    //return ((next & 0x3FFFFFFF))/(4294967296.0>>16)
  },

  randf: function() {
    return G.math.rand01()*2 - 1;
  },

  crop: function(a, b, t) {
    return max(a, min(b, t));
  }

};


function Entities(remove_callback) {
    this.ent = [];
    this.remove_callback = remove_callback;
    if(Entities.all === undefined) {
      Entities.all = [];
    }
    Entities.all.push(this);
}

Entities.update = function(dt) {
    for(var i = 0; i < Entities.all.length; ++i) {
      Entities.all[i].update(dt);
    }
}
Entities.render = function(c) {
    for(var i = 0; i < Entities.all.length; ++i) {
      Entities.all[i].render(c);
    }
}

Entities.prototype.add = function(b) {
    b.parent = this;
    this.ent.push(b);
    return b;
}

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
    for(var i = 0; i < b.length; ++i) {
        b[i].render(ctx);
    }
};
/*
Entities.prototype.get_by_type = function(type) {
    var t = [];
    for(var i = 0; i < b.length; ++i) {
        var a = b[i];
        if(a.type === type) {
            t.push(a);
        }
    }
    return t;
}
*/



  return  {
    math: math,
    Entities: Entities
  };
})();
