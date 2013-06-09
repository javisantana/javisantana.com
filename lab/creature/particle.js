
var max = Math.max;

function ParticleSystem() {
   this.m_x = [];
   this.m_oldx = [];
   this.m_a = [];
   this.m_vGravity = vec2(0, -9.8);
   this.motors = [];
   this.constraits = [];
}

ParticleSystem.prototype.to_json = function() {
  var positions = [];

  var p = this.m_x[0];
  positions.push(p.x, p.y);
  for(var i = 1; i < this.m_x.length; ++i) {
      var p = sub(this.m_x[i], this.m_x[i-1]);
      positions.push(p.x, p.y);
  }
  var cons = [];
  for(var c in this.constraits) {
      var cc = this.constraits[c];
      cons.push(cc.p0, cc.p1, cc.torque, cc.sprint_K);
  }
  return positions.join(',') + '$' + cons.join(',')
}

ParticleSystem.from_json = function(str) {
  var p = new ParticleSystem();
  var u = str.split('$');
  var o = {
    p: u[0],
    c: u[1]
  }
  var tk = o.p.split(',').map(function(f) { return parseInt(f, 10); });
  var old = vec2(tk[0], tk[1]);
  p.add(old);
  for(var i = 2; i < tk.length; i+=2) {
      var n = vec2(tk[i], tk[i+1]);
      p.add(n=add(old, n));
      old = n;
  }

  tk = o.c.split(',');
  if(tk.length > 1) 
    for(var i = 0; i < tk.length; i+=4) {
      p.add_constrait(
        parseInt(tk[i], 10),
        parseInt(tk[i+1], 10),
        tk[i+2] == ''?undefined: parseFloat(tk[i + 2]),
        tk[i+3] == ''?undefined: parseFloat(tk[i + 3])
      )
    }

  return p;
}


ParticleSystem.prototype.add = function(p) {
    var self = this;
    self.m_x.push(p);
    self.m_oldx.push(p);
    self.m_a.push(self.m_vGravity);
    return self.m_x.length - 1;
}


ParticleSystem.prototype.change_pos = function(i, p) {
  this.m_x[i] = p;
  this.m_oldx[i] = p.clone();
  this._update_constraits();
}

ParticleSystem.prototype._update_constraits = function() {
   for(var c in this.constraits) {
      var cons = this.constraits[c];
      var x1 = this.m_x[cons.p0];
      var x2 = this.m_x[cons.p1];
      cons.original_length = cons.length = sub(x1, x2).length();
   }
}
/**
 * given particle index return all particles linked to it 
 */
ParticleSystem.get_linked = function(p) {
   var linked = [];
   for(var c in self.constraits) {
       if(c.p0 == p) {
           linked.push(c.p1);
       }
       if(c.p1 == p) {
           linked.push(c.p2);
       }
   }
}

// return constrait index by linked points. -1 if fails
ParticleSystem.prototype.get_constrait = function(p0, p1) {
     for(var c in self.constraits) {
         var cons = self.constraits[c];
         if(cons.p0 == p0 && cons.p1 == p1 ||
             cons.p0 == p1 && cons.p1 == p0) {
           return c;
         }
     }
     return -1;
}

ParticleSystem.prototype.add_constrait = function(p0, p1, torque, sprint_K) {
    var self = this;
    if(p0 === p1 || self.get_constrait(p0, p1) >= 0) {
      return;
    }
    var x1 = self.m_x[p0];
    var x2 = self.m_x[p1];
    var c = {
        p0: p0,
        p1: p1,
        length: sub(x1, x2).length(),
        original_length: sub(x1, x2).length(),
        torque: torque,
        sprint_K: sprint_K,
        time: 0
    };
    self.constraits.push(c);
    if(torque) {
        self.motors.push(c);
    } 
};

ParticleSystem.prototype.render = function(ctx) {
   var self = this;
   var radius = 8;

   //ctx.strokeStyle= "rgba(200, 200, 200, 1)";
   ctx.strokeStyle= "rgba(0, 0, 0, 1)";
   ctx.strokeStyle= "rgba(39, 56, 74, 1)";
   ctx.lineWidth = radius +  2;
   ctx.lineWidth = 5;
   //ctx.lineCap = 'round';
   var M = 4;
   for(var c in self.constraits) {
       var cons = self.constraits[c];
       var x1 = self.m_x[cons.p0];
       var x2 = self.m_x[cons.p1];
       var d = normalize(sub(x1, x2));
       var v = normal(d);
       ctx.beginPath();

       ctx.moveTo(x1.x + M*v.x - M*d.x, -x1.y - v.y*M + M*d.y);
       ctx.lineTo(x2.x + M*v.x + M*d.x, -x2.y - v.y*M - M*d.y);

       ctx.moveTo(x1.x - M*v.x - M*d.x, -x1.y + v.y*M + M*d.y);
       ctx.lineTo(x2.x - M*v.x + M*d.x, -x2.y + v.y*M - M*d.y) ;

       ctx.stroke();
   }

   //ctx.fillStyle= "rgba(100, 100, 100, 0.7)";
   //ctx.strokeStyle= "rgba(50, 50, 50, 1)";
   ctx.lineWidth = 7;
   for(var i in self.m_x) {
      var p = self.m_x[i];
      ctx.save();
      ctx.translate(p.x-radius, -p.y - radius);
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      //ctx.fill();
      ctx.stroke();
      ctx.restore();
   }

};

// Verlet integration step
ParticleSystem.prototype.verlet = function(dt) {
   var self = this;
   for(var i in self.m_x) {
      var x = self.m_x[i];
      var temp = x;
      var oldx = self.m_oldx[i];
      var a = self.m_a[i];
      self.m_x[i] = add(x, add(sub(x, oldx), mul(dt*dt, a)));
      self.m_oldx[i] = temp;
      //x += x-oldx+a*fTimeStep*fTimeStep;
   }
};
ParticleSystem.prototype.AccumulateForces = function(dt) {
    var self = this;
    for(var i in self.m_a) {
        self.m_a[i] = self.m_vGravity.clone();
        //self.m_a[i] = vec2(0,0);//self.m_vGravity.clone();
    }
    for(var i in self.constraits) {
        var m = self.constraits[i];
        m.time += dt;
        if(m.torque) {
          var x1 = self.m_x[m.p0];
          var x2 = self.m_x[m.p1];
          var radio = sub(x2, x1);
          var force = mul(m.torque, normalize(normal(radio)));
          self.m_a[m.p1].add(force);
        } else if(m.sprint_K) {
          var c = 0.2*Math.sin(m.time);
          m.length = (1 - c) * m.original_length;
        }
    }
};

ParticleSystem.prototype.SatisfyConstraints = function() {
   var self = this;
   var NUM_ITERATIONS = 2;
   for(var j = 0; j < NUM_ITERATIONS; ++j) {
         // floor
         for(var i in self.m_x) {
             // manage friction
             if(self.m_x[i].y < -80) {
                 self.m_x[i].y = max(-80, self.m_x[i].y);
                 var vel = sub(self.m_x[i], self.m_oldx[i]);
                 vel = mul(0.2, vel);
                 vel.y = 0;
                 self.m_oldx[i] = add(self.m_oldx[i], vel);
             }
         }
         for(var c in self.constraits) {
             var cons = self.constraits[c];
             var x1 = self.m_x[cons.p0];
             var x2 = self.m_x[cons.p1];
             var delta = sub(x2, x1)
             var deltalength = delta.length();
             diff = (deltalength-cons.length)/deltalength;
             self.m_x[cons.p0] = add(x1, mul(0.5*diff, delta));
             self.m_x[cons.p1] = sub(x2, mul(0.5*diff, delta));
         }
   }
}
ParticleSystem.prototype.tick = function(dt) {
   this.AccumulateForces(dt);
   this.verlet(dt);
   this.SatisfyConstraints();
}

ParticleSystem.prototype.render2 = function(ctx) {
   var self = this;
   var radius = 6;

   //ctx.strokeStyle= "rgba(200, 200, 200, 1)";
   ctx.strokeStyle= "rgba(0, 0, 0, 1)";
   ctx.strokeStyle= "rgba(106, 119, 127, 1)";
   ctx.fillStyle= "rgba(106, 119, 127, 1)";
   ctx.lineWidth = radius + 2;
   ctx.lineWidth = 5;
   //ctx.lineCap = 'round';
   var M = 4;
   for(var c in self.constraits) {
       var cons = self.constraits[c];
       var x1 = self.m_x[cons.p0];
       var x2 = self.m_x[cons.p1];
       var d = normalize(sub(x1, x2));
       var v = normal(d);
       ctx.beginPath();

       /*
       ctx.moveTo(x1.x + M*v.x - M*d.x, -x1.y - v.y*M + M*d.y);
       ctx.lineTo(x2.x + M*v.x + M*d.x, -x2.y - v.y*M - M*d.y);

       ctx.moveTo(x1.x - M*v.x - M*d.x, -x1.y + v.y*M + M*d.y);
       ctx.lineTo(x2.x - M*v.x + M*d.x, -x2.y + v.y*M - M*d.y) ;
       */
       ctx.moveTo(x1.x - M*d.x, -x1.y + M*d.y);
       ctx.lineTo(x2.x + M*d.x, -x2.y - M*d.y);

       ctx.moveTo(x1.x - M*d.x, -x1.y  + M*d.y);
       ctx.lineTo(x2.x + M*d.x, -x2.y  - M*d.y) ;

       ctx.stroke();
   }

   //ctx.fillStyle= "rgba(100, 100, 100, 0.7)";
   //ctx.strokeStyle= "rgba(50, 50, 50, 1)";
   ctx.lineWidth = 7;
   for(var i in self.m_x) {
      var p = self.m_x[i];
      ctx.save();
      ctx.translate(p.x-radius, -p.y - radius);
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      //ctx.stroke();
      ctx.restore();
   }

};

function rnd() {
  return 2*(Math.random() - 0.5);
}
ParticleSystem.prototype.render3 = function(ctx) {
   var self = this;
   var radius = 2;

   //ctx.strokeStyle= "rgba(200, 200, 200, 1)";
   ctx.strokeStyle= "rgba(0, 0, 0, 1)";
   ctx.strokeStyle= "rgba(106, 119, 127, 0.7)";
   ctx.fillStyle= "rgba(106, 119, 127, 1)";
   ctx.lineWidth = radius*2 + 2;
   //ctx.lineCap = 'round';
   var M = 4;
   for(var c in self.constraits) {
       var cons = self.constraits[c];
       var x1 = self.m_x[cons.p0];
       var x2 = self.m_x[cons.p1];
       var d = normalize(sub(x1, x2));
       var v = normal(d);
       ctx.beginPath();

       for(var i = 0; i < 4; ++i) {
         ctx.lineWidth = 0.4;
         ctx.moveTo(rnd() + x1.x + M*v.x - M*d.x, rnd() + -x1.y - v.y*M + M*d.y);
         ctx.lineTo(rnd() + x2.x + M*v.x + M*d.x, rnd() + -x2.y - v.y*M - M*d.y);

         ctx.moveTo(rnd() + x1.x - M*v.x - M*d.x, rnd() + -x1.y + v.y*M + M*d.y);
         ctx.lineTo(rnd() + x2.x - M*v.x + M*d.x, rnd() + -x2.y + v.y*M - M*d.y) ;
       }

       ctx.stroke();
   }

   ctx.lineWidth = 7;
   for(var i in self.m_x) {
      var p = self.m_x[i];
      for(var i = 0; i < 4; ++i) {
        ctx.save();
        ctx.translate(rnd() + p.x-radius, rnd()  -p.y - radius);
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
   }

};

ParticleSystem.prototype.render4 = function(ctx) {
   var self = this;
   var radius = 3;

   ctx.strokeStyle= "rgba(106, 119, 127, 1)";
   ctx.fillStyle= "rgba(106, 119, 127, 1)";
   ctx.lineWidth = radius*2 + 2;
   ctx.lineWidth = 2;
   //ctx.lineCap = 'round';
   var M = 4;
   for(var c in self.constraits) {
       var cons = self.constraits[c];
       var x1 = self.m_x[cons.p0];
       var x2 = self.m_x[cons.p1];
       var d = normalize(sub(x1, x2));
       var v = normal(d);
       ctx.beginPath();

       if(cons.sprint_K) {
         ctx.lineWidth = 2;
         ctx.moveTo(x1.x + M*v.x - M*d.x, -x1.y - v.y*M + M*d.y);
         ctx.lineTo(x2.x + M*v.x + M*d.x, -x2.y - v.y*M - M*d.y);

         ctx.moveTo(x1.x - M*v.x - M*d.x, -x1.y + v.y*M + M*d.y);
         ctx.lineTo(x2.x - M*v.x + M*d.x, -x2.y + v.y*M - M*d.y) ;
       } else {
         ctx.lineWidth = 3;
         ctx.moveTo(x1.x - M*d.x, -x1.y + M*d.y);
         ctx.lineTo(x2.x + M*d.x, -x2.y - M*d.y);

         ctx.moveTo(x1.x - M*d.x, -x1.y  + M*d.y);
         ctx.lineTo(x2.x + M*d.x, -x2.y  - M*d.y) ;
       }

       ctx.stroke();
   }

   //ctx.fillStyle= "rgba(100, 100, 100, 0.7)";
   ctx.strokeStyle= "#FFF";
   ctx.lineWidth = 2;
   for(var i in self.m_x) {
      var p = self.m_x[i];
      ctx.save();
      ctx.translate(p.x-radius, -p.y - radius);
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
   }

};

