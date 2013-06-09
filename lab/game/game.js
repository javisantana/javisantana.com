
var linear = G.math.linear;
var rand01 = G.math.rand01;
var randf = G.math.randf;
var BKG_SPEED = 0.1;
function Background(W, H) {
      var BW = 10;
      this.newseed = 10;
      var global_x = 0;
      var h = H;
      var w = W;

      function draw_build(c, x, y, w, h) {
          c.beginPath();
          c.arc(x, y +2, w*0.5, 0, 2*Math.PI, true); 
          c.closePath();
          c.fill();
          c.fillRect(x - w*.05, y, w*0.1, h);
      }

      function draw_mountain(c, x, y, w, h) {
          c.beginPath();
          c.arc(x, y +2, w*0.5, 0, Math.PI, true); 
          c.closePath();
          c.fill();
          c.fillRect(x - w*.5, y, w, h);
      }

      function draw_endless(slots, mul,  callback) {
        var space = (w/slots)>>0;
        for(var i = 0; i < slots; ++i) {
          var gx = global_x*mul;
          var tile = (gx/space >> 0) + i;
          var frac = gx%space;
          callback(tile, i*space - frac)
        }
      }

      function draw_builing(c, px, h) {
         c.fillStyle = "rgba(0, 0, 0, 0.1)";
         var w = BW*0.5; //BW*Math.random();
         c.fillRect(px + w*0.5, 0, w , Math.random()*h)
      }
      this.update = function(dt) {
        global_x+=BKG_SPEED;
        return true;
      }
      this.render = function(c) {
          var old_seed = G.math.seed;
          G.math.seed = this.newseed;
          var h6 = h/6;
          c.fillStyle = '#8fc6db';
          c.fillRect(0, 0, w, h6)
          c.fillStyle = '#9bd6dc';
          c.fillRect(0, h6, w, h6)
          c.fillStyle = '#a4e3db';
          c.fillRect(0, 2*h6, w, h6);
          c.fillStyle = '#aaffdb';
          c.fillRect(0, 3*h6, w, 3*h6);

          c.fillStyle = '#aaeedb';
          c.fillStyle = '#8fc6db';

          draw_endless(100, 1.0, function(tile, pos) {
            if(G.math.white(tile) < 0.5) {
                var mh = 80;
                mh = 40+ 80*G.math.white(tile)
                draw_build(c, pos, h-mh, 10, mh);
              }
          });

          draw_endless(30, 2.0, function(tile, pos) {
              var mh = G.math.linear(10, 60, G.math.white(tile));//G.math.linear(40, 60, G.math.rand01());
              var sat = 32 + 20*G.math.white(tile);
              c.fillStyle= "hsl(74," + sat + "%, 63%)";//#B1BF84";
              draw_mountain(c,pos , h-mh,
              //G.math.linear(4, 20, G.math.rand01()), 
                G.math.linear(4, 50, G.math.white(tile*3)),
                mh);
          });

          draw_endless(20, 6.0, function(tile, pos) {
              var mh = 0;//G.math.linear(3, 5, G.math.white(tile));//G.math.linear(40, 60, G.math.rand01());
              var sat = 32 + 20*G.math.white(tile*3);
              c.fillStyle= "hsl(74," + sat + "%, 80%)";//#B1BF84";
              draw_mountain(c,pos, h-mh,
              //G.math.linear(4, 20, G.math.rand01()), 
                G.math.linear(20, 70, G.math.white(tile*7)),
                mh);
          });
          c.fillStyle= "hsl(74, 50%, 40%)";//#B1BF84";
          c.fillRect(0, h-5, w, 5)
          G.math.seed = old_seed;
      }
}


/*
 =====================================
 abstract user controls
 =====================================
 */
function Controller() {
  this.keys = {
    up: false,
    down: false,
    left: false,
    rigth: false,
    fire: false
  }
  var c = this.keys;
  var manage = function(e, s) {
        if(e.keyCode == 38) {      c.up= s; }
        else if(e.keyCode == 40) { c.down = s; }
        else if(e.keyCode == 37) { c.left = s; } 
        else if(e.keyCode == 39) { c.right= s; } 
        else if(e.keyCode == 32) { c.fire = s; } 
  };
  window.addEventListener('keyup', function(e) {
      manage(e, false);
  })
  window.addEventListener('keydown', function(e) { 
      manage(e, true);
  });
}

function inside_canvas(x, y, margin) {
  margin = margin || 0;
  return x > -margin && x < Game.W+margin && y > -margin && y < Game.H+margin;
}

/*
 =====================================
 bullets
 =====================================
 */

var Bullet = function(_x, _y, _dx, _dy) {
  this.x = _x;
  this.y = _y;
  this.dx = _dx;
  this.dy = _dy;
  this.damage = 1;
  this.dead = false;

  this.contact = function() {
    this.dead = true;
  }
  this.update = function(dt) {
    this.x += this.dx;
    this.y += this.dy;
    return !this.dead && inside_canvas(this.x, this.y);
  }
  this.render = function(c) {
    c.fillRect(this.x, this.y, 3, 2);
  }
}


function EnemyBullet(x, y, accuracity, vel) {
  var cycle = 0;
  this.x = x;
  this.y = y;
  var d = Game.player.get_dir_from(x, y);
  vel = vel || 2;
  accuracity = (1 - accuracity) || 0;
  this.dx = d.x*3 + G.math.randf()*accuracity;
  this.dy = d.y*3 + G.math.randf()*accuracity;
  this.dead = false;

  this.base_update = this.update;
  this.update = function(dt) {
    ++cycle;
    return this.base_update(dt);
  }

  this.render = function(c) {
    var s = Game.ENEMY_BULLET_SIZE;
    c.fillStyle = cycle%20 < 10 ? "#FFF": "#000";
    c.fillRect(this.x, this.y, s, s);
  }
}

EnemyBullet.prototype = new Bullet();

var player_fire = function(x, y) {
    bullets.add(new Bullet(x, y, 10, 0.3));
}

/*
 =====================================
 enemy ships
 =====================================
 */

var Ship = function(x, y) {
  this.x = x;
  this.y = y;
  this.box_x = 5;
  this.box_y = 5;
  this.life = 1;
}

Ship.SMALL= 0;
Ship.MEDIUM = 1;

Ship.create = function(x, y, shipInfo) {
  switch(shipInfo.type) {

    case Ship.SMALL:
      s = new SmallShipWave(x, y);
      break;

    case Ship.MEDIUM:
      s = new MediumShip(x, y);
      break;
  }
  s.properties = shipInfo;
  return s;
}

Ship.prototype.make_damage = function(amount) {
  this.life -= amount;
}

/** return distance to box */
Ship.prototype.distance = function(x, y) {
  var dx = Math.max(0, Math.abs(x - this.x) - this.box_x)
  var dy = Math.max(0, Math.abs(y - this.y) - this.box_y)
  return dx+dy;
}

Ship.prototype.collide = function(x, y) {
  return this.distance(x, y) < 3;
}

Ship.prototype.render = function(c) {
    var self = this;
    var prop = self.properties;
    if(!prop.cells) return;
    var px = 1;
    for(var i = 0; i < 20; ++i) {
      for(var j = 0; j < 20; ++j) {
        c.fillStyle="rgba(0,0,0,1)";
        var S = 10;
        var S2 = 5;
        var color_idx;
        if(color_idx=prop.cells[i][j]) {
          c.fillStyle = prop.palete[color_idx];
          c.fillRect((this.x>>0) + (j-10)*px , (this.y>>0) + (i-10)*px , px, px);
        }
      }
    }
}

/**
 * ship types
 */
function SmallShip(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.life = 1;

  this.update = function(dt) {
    this.x += this.dx;
    this.y += this.dy;
    if(this.life < 0) {
      this.dx += (-6*BKG_SPEED - this.dx)*0.01;
      this.dy += (BKG_SPEED*4 - this.dy)*0.05;
      this.y = Math.min(Game.H-10, this.y);
    }
    return this.is_dead();
  }

  this.is_dead = function() {
    if(G.math.rand01() < 0.005) {
      ship_bullets.add(new EnemyBullet(this.x, this.y));
    }
    return this.life >0 && inside_canvas(this.x, this.y, 50);
  }

  this.render = function(c) {
    c.fillStyle="rgba(0,0,0,1)";
    var S = 4;
    var S2 = 2;
    c.fillRect(this.x - S2, this.y - S2, S, S);
    c.fillRect(this.x - 1, this.y + S2, S2, S2);
    c.fillRect(this.x - 1, this.y - S, S2, S2);
  }
}
SmallShip.prototype = new Ship();

function GroundShip() {
  this.x = Game.W;
  this.y = Game.GROUND_LEVEL;
  this.life = 1;
  var fire = 0;


  this.update = function(dt) {
    this.x -= 6*BKG_SPEED;
    return this.is_dead();
  }

  this.is_dead = function() {
    if(++fire%103 == 0) {
      ship_bullets.add(new EnemyBullet(this.x, this.y));
    }
    return this.life >0 && inside_canvas(this.x, this.y, 50);
  }

  this.render = function(c) {
    c.fillStyle="rgba(0,0,0,1)";
    var S = 6;
    c.fillRect(this.x, this.y - S, S, S);
    c.fillRect(this.x + 3, this.y - S - 2, 2, 2);
  }

}
GroundShip.prototype = new Ship();


function SmallShipWave(x, y) {
  this.x = x;
  this.y = y;
  var sy = y;
  this.time = 0;
  this.update = function(dt) {
    this.time += 0.2;
    this.x -= 2;
    this.y = sy + 10*Math.cos(this.time);
    return this.is_dead();
  }
}

SmallShipWave.prototype = new SmallShip();

// medium ship
function MediumShip(x, y) {
  this.x = x;
  this.y = y;
  this.target_x = Game.W*(0.65 +  0.15*randf());
  this.target_y = Game.H*(0.5 + 0.1*randf());
  this.life = 8;
  this.time = 0;
  this.freq_x = G.math.rand01()*3;
  this.freq_y = G.math.rand01()*2;

  this.update = function(dt) {
    this.time += dt;
    this.x += (this.target_x - this.x)*0.01 + Math.cos(this.freq_x*this.time)
    this.y =  this.target_y + 30*Math.cos(this.freq_y*this.time);
    if(G.math.rand01() < 0.005) {
      ship_bullets.add(new EnemyBullet(this.x, this.y, 0.1));
      ship_bullets.add(new EnemyBullet(this.x, this.y, 0.1));
      ship_bullets.add(new EnemyBullet(this.x, this.y, 0.1));
    }
    return this.is_dead();
  }

  this.is_dead = function() {
    return this.life >0;
  }

  /*this.render = function(c) {
    c.fillStyle="rgba(0,0,0,1)";
    var S = 10;
    var S2 = 5;
    c.fillRect(this.x - S2, this.y - S2, S, S);
  }*/
}

MediumShip.prototype = new Ship();


/*
 =====================================
 ship emitter
 =====================================
 */
function Burst(type, count, dir, pos) {
  var time = 0;
  this.update = function(dt) {
      if(time % 20 === 0) {
        ships.add(new type(pos.x, pos.y, dir.x, dir.y));
        --count;
      }
      ++time;
      return count !== 0;
  }
  this.render = function() {};
}

function RandomBurst(type, count, dir) {
  var time = 0;
  this.update = function(dt) {
      var margin = Game.H/4;
      if(time % 10 === 0) {
        ships.add(new type(Game.W, 
              G.math.linear(margin, Game.H-margin, G.math.rand01()),
              -2, 0));
        --count;
      }
      ++time;
      return count !== 0;
  }
  this.render = function() {};
}


function ShipEmit() {
  var count = 0;
  this.enabled = true;
  var small_types = [SmallShipWave, SmallShipWave];

  var random_small_ship = function() {
    return small_types[(G.math.rand01()*2)>>0]
  }

  this.update = function() {
    if(!this.enabled) return;
    ++count;
    if(count%200 == 0) {
      var dx = 1 + G.math.rand01()*10;
      var dy = G.math.randf()*5;
      if(G.math.rand01() < 0.5) {
        this.emit_random();
      } else {
        this.emit_burst();
      }
      /*actors.add(new Burst(SmallShip, 2, 
            {x: -3, y: 0},
            {x: W, y: H/2}
            ));
            */
      //this.emit_random();
    }
    if(count%301 == 0) {
      ships.add(new GroundShip());
    }
    if(count%297 == 0) {
      this.emit_medium();
    }
    return true;
  }

  this.render = function(){}

  this.emit_medium = function() {
      ships.add(new MediumShip(Game.W, Game.H/2));
  }

  this.emit_random = function() {
      var num_ships = linear(2, 30, Game.difficulty) >> 0;
      actors.add(new RandomBurst(random_small_ship(), num_ships, {x: -3, y: 0}));
  }

  this.emit_burst = function() {
      var num_ships = linear(2, 10, Game.difficulty) >> 0;
      var margin = Game.H/4;
      var pos = {
        x: Game.W,
        y: linear(margin, Game.H-margin, G.math.rand01())
      };
      actors.add(new Burst(random_small_ship(), num_ships, {x: -3, y: 0}, pos));
  }
}

/*
 =====================================
 player
 =====================================
 */


var Player = function() {
  var keys = new Controller();
  this.x = 0;
  this.y = 0;
  var vel = 3;
  var fires = 0;

  var FIRE_RATE = 7;

  this.update = function(dt) {
    var y = this.y;
    var x = this.x;
    if(keys.keys.up) { y-= vel;}
    if(keys.keys.down) { y+= vel;}
    if(keys.keys.left) { x-= vel;}
    if(keys.keys.right) { x+= vel;}
    if(keys.keys.fire) {
      if(++fires%FIRE_RATE == 0) {
        player_fire(x+10, y);
      }
    }
    this.x = G.math.crop(0, Game.W, x)
    this.y = G.math.crop(3, Game.GROUND_LEVEL-5, y)
  }

  this.get_dir_from = function(x, y) {
    var x = this.x - x;
    var y = this.y - y;
    var m = Math.sqrt(x*x + y*y);

    return {
      x: x/m,
      y: y/m
    }
  }

  this.render = function(c) {
    var y = this.y;
    var x = this.x;
    c.fillStyle = '#111';
    c.fillRect(x+2, y-2, 5, 2);
    c.fillRect(x, y, 12, 3);
    c.fillRect(x+12, y+1, 3, 2);
  }
}

Player.prototype = new Ship();

/*
 =====================================
 collisions
 =====================================
 */

function check_collisions() {
  var _bullets = bullets.ent;
  var _ships = ships.ent;
  // player bullets vs enemies
  for(var b in _bullets) {
    var bullet = _bullets[b];
    for(var s in _ships) {
      var ship = _ships[s];
      if(ship.collide(bullet.x, bullet.y)) {
        ship.make_damage(bullet.damage);
        bullet.contact();
        Particle.explosion({x : ship.x, y: ship.y});
      }
    }
  }

  // enemies vs player
  for(var b in ship_bullets.ent) {
    var bullet = ship_bullets.ent[b];
    var pl = Game.player;
    if(pl.collide(bullet.x, bullet.y)) {
        pl.make_damage(bullet.damage);
        bullet.contact();
        Particle.explosion({x : pl.x, y: pl.y});
    }
  }
}

/*
 =====================================
 particle systems
 =====================================
 */
var Particle = {
  explosion: function(pos) {
        particles.add({
            pos: pos,
            life: 0.3,

            update: function(dt) {
                return (this.life -= dt) > 0;
            },

            render: function(c) {
                var p = this.pos;
                c.beginPath();
                var ln = linear(1, 7, this.life/0.3)>>0;
                c.lineWidth = ln
                //c.lineWidth = 5;
                c.arc(p.x, p.y, 3 + (3 - (ln>>1)), 0, Math.PI*2, true);
                c.closePath();
                c.stroke();
            }

        });
  }

}

var actors = new G.Entities();
var bullets = new G.Entities();
var ship_bullets = new G.Entities();
var ships = new G.Entities();
var particles = new G.Entities();
var player = new Player();


var Game = {
  W: 480,
  H: 320/2,
  difficulty: 0.0,
  Particle: Particle,
  player: player,

  ENEMY_BULLET_SIZE: 4

};
Game.GROUND_LEVEL = Game.H - 5;
