
var max = Math.max;

function ParticleSystem() {
   this.m_x = [];
   this.m_oldx = [];
   this.m_a = [];
   this.m_vGravity = vec2(0, -9.8);
   this.motors = [];
   this.constraits = [];
   this.angle_constrait = [];
}

ParticleSystem.prototype.translate = function(x, y) {
  var p = this.m_x;
  var offset = vec2(x, y);
  for(var i = 0; i < p.length; ++i) {
    var v = p[i];
    p[i] = add(v, offset);
    this.m_oldx[i] = add(this.m_oldx[i], offset);
  }
}

ParticleSystem.prototype.to_json = function() {
  return JSON.stringify(this)
}

ParticleSystem.from_json = function(str) {
  var o = JSON.parse(str);
  var p = new ParticleSystem();
  var deserialize_vec = function(v) {
    var a = []
    for(var i in v) {
      a.push(vec2(v[i].x, v[i].y));
    }
    return a;
  }
  p.m_x = deserialize_vec(o.m_x);
  p.m_oldx = deserialize_vec(o.m_oldx);
  p.m_a = deserialize_vec(o.m_a);
  p.m_vGravity = vec2(o.m_vGravity.x, o.m_vGravity.y);
  p.motors = o.motors;
  p.constraits = o.constraits;
  return p;
}


ParticleSystem.prototype.add = function(p) {
    var self = this;
    self.m_x.push(p);
    self.m_oldx.push(p);
    self.m_a.push(vec2(0,0));
    self.angle_constrait.push(null);
    return self.m_x.length - 1;
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

ParticleSystem.prototype.add_constrait = function(p0, p1, torque) {
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
        torque: torque
    };
    self.constraits.push(c);
    if(torque) {
        self.motors.push(c);
    }
};

ParticleSystem.prototype.render = function(ctx) {
   var self = this;
   for(var i in self.m_x) {
      var p = self.m_x[i];
      ctx.save();
      var radius = 2;
      ctx.translate(p.x-radius, -p.y - radius);
      ctx.beginPath();
      ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
   }
   for(var c in self.constraits) {
       var cons = self.constraits[c];
       var x1 = self.m_x[cons.p0];
       var x2 = self.m_x[cons.p1];
       if(cons.torque) {
         ctx.strokeStyle= "#F00";
       }
       ctx.beginPath();
       ctx.moveTo(x1.x, -x1.y);
       ctx.lineTo(x2.x, -x2.y);
       ctx.stroke();
       ctx.strokeStyle= "#000";

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

ParticleSystem.prototype.add_force = function(i, force) {
  this.m_a[i] = force;
}

ParticleSystem.prototype.AccumulateForces = function() {
    var self = this;
    for(var i in self.m_a) {
        //self.m_a[i] = self.m_vGravity.clone();
    }
    for(var i in self.motors) {
        var m = self.motors[i];
        var x1 = self.m_x[m.p0];
        var x2 = self.m_x[m.p1];
        var radio = sub(x2, x1);
        var force = mul(m.torque, normalize(normal(radio)));
        self.m_a[m.p1].add(force);
    }
};

ParticleSystem.prototype.set_angle_constrait= function(i, v) {
  this.angle_constrait[i] = v;
}

ParticleSystem.prototype.SatisfyConstraints = function() {
   var self = this;
   var NUM_ITERATIONS = 2;
   for(var j = 0; j < NUM_ITERATIONS; ++j) {
         // floor
         for(var i in self.m_x) {
             // manage friction
             var vel = sub(self.m_x[i], self.m_oldx[i]);
             vel = mul(0.01, vel);
             var a = self.angle_constrait[i];
             if(a) {
               var proj = dot(a, vel);
               vel = mul(proj, a);
             }
             self.m_oldx[i] = add(self.m_oldx[i], vel);
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
   //this.AccumulateForces();
   this.verlet(dt);
   this.SatisfyConstraints();
}

/*
// Sample code for physics simulation
class ParticleSystem {
   Vector3    m_x[NUM_PARTICLES];    // Current positions
   Vector3    m_oldx[NUM_PARTICLES]; // Previous positions
   Vector3    m_a[NUM_PARTICLES];    // Force accumulators
   Vector3    m_vGravity;            // Gravity
   float      m_fTimeStep;
public:
   void       TimeStep();
private:
   void       Verlet();
   void       SatisfyConstraints();
   void       AccumulateForces();
// (constructors, initialization etc. omitted)
};
// Verlet integration step
void ParticleSystem::Verlet() {
   for(int i=0; i<NUM_PARTICLES; i++) {
      Vector3& x = m_x[i];
      Vector3 temp = x;
      Vector3& oldx = m_oldx[i];
      Vector3& a = m_a[i];
      x += x-oldx+a*fTimeStep*fTimeStep;
      oldx = temp;
   }
}
// This function should accumulate forces for each particle
void ParticleSystem::AccumulateForces()
{
// All particles are influenced by gravity
   for(int i=0; i<NUM_PARTICLES; i++) m_a[i] = m_vGravity;
}
// Here constraints should be satisfied
void ParticleSystem::SatisfyConstraints() {
// Ignore this function for now
   for(int j=0; j<NUM_ITERATIONS; j++) {
         // First satisfy (C1)
         for(int i=0; i<NUM_PARTICLES; i++) { // For all particles
            Vector3&             x = m_x[i];
               x = vmin(vmax(x, Vector3(0,0,0)),
                  Vector3(1000,1000,1000));
         }

         // Then satisfy (C2)
         Vector3& x1 = m_x[0];
         Vector3& x2 = m_x[1];
         Vector3 delta = x2-x1;
         float deltalength = sqrt(delta*delta);
         float diff = (deltalength-restlength)/deltalength;
         x1 -= delta*0.5*diff;
         x2 += delta*0.5*diff;
   }
}
void ParticleSystem::TimeStep() {
   AccumulateForces();
   Verlet();
   SatisfyConstraints();
}
    */
