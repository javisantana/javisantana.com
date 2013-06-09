
function Endless() {
  var BW = 10;
  // some math
  var W = Game.W;//480;//600;
  var H = Game.H;//320/2;//120;

  cos = Math.cos;

  function front_canvas() {
      var canvas = document.getElementById('f');
      canvas.height = Game.H;
      canvas.width = Game.W;
      var ctx = canvas.getContext('2d');
      var pixels = ctx.getImageData(0,0,W, H);
      for(var i=0;i<Game.W;++i) 
      for(var j=0;j<Game.H; ++j) {
          var x = i/W;
          var y = j/H;
          var o = x*(1-x);//*y*(1-y);
          o = Math.sqrt(Math.sqrt(o));
          var c = G.math.rand01();
          var idx = 4*(j*W+i);
          /*pixels.data[idx+0] = 0;
          pixels.data[idx+1] = 0;
          pixels.data[idx+2] = 0;*/
          pixels.data[idx+3] = 150*(1-o)+ 20*c//*255*c;//*(c*255);
      }
      ctx.putImageData(pixels, 0, 0);
 }
 front_canvas();

  //document.getElementById('change').onclick = function() {
    //bkg.newseed += 30;
    //return false;
  //}

  var emiter = new ShipEmit();
  this.emiter = emiter;

  var debug = true;
  function init() {
     if(debug) {
       var gui = new dat.GUI();
       gui.add(Game, 'difficulty', 0.0, 1.0).step(0.01);
       var emit = gui.addFolder('Emiter');
       emit.add(emiter, 'emit_random');
       emit.add(emiter, 'emit_burst');
       emit.add(emiter, 'emit_medium');
       emit.add(emiter, 'enabled');
     }

     var canvas = document.getElementById('c');
     var c = canvas.getContext('2d');
     var w = canvas.width = Game.W;
     var h = canvas.height = Game.H;
     var start = (new Date()).getTime();

     var bkg = new Background(Game.W, Game.H);

     actors.add(bkg);
     actors.add(emiter);

     setInterval(function() {
          var time = (new Date()).getTime() - start;
          // update
          check_collisions();

          G.Entities.update(0.02);
          player.update(0.02);

          // render
          canvas.width = canvas.width;
          G.Entities.render(c);
          player.render(c);

     }, 20);
  }
  init();
}
