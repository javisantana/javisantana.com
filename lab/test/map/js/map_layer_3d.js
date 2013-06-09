
function linear(a, b, t) {
    return a + t*(b-a);
}

function clamp(a, b, t) {
    if(t < a) {
        return a;
    } else if(t > b) {
        return b;
    }
    return t;
}


function texture_text() {
    var imageCanvas = document.createElement( "canvas" ),
                    context = imageCanvas.getContext( "2d" );

    imageCanvas.width = imageCanvas.height = 128;

    context.fillStyle = "#444";
    context.fillRect( 0, 0, 128, 128 );
    context.fillStyle = "#fff";
    context.fillRect( 0, 0, 64, 64);
    context.fillRect( 64, 64, 64, 64 );

    var textureCanvas = new THREE.Texture( imageCanvas, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping );
    textureCanvas.needsUpdate = true;
    return textureCanvas;
}

function Layer3D() {

    var self = this;
    pi = Math.PI;
    var vec3 = THREE.Vector3;
    var max = Math.max;
    var min = Math.min;

    if ( ! Detector.webgl ){
         Detector.addGetWebGLMessage();
    }

    var container, stats;

    var camera, scene, renderer;

    var objects = [];
    var time = 0;
    this.rotation = 0;
    this.rotation_x = 0;
    var mouseX=0, mouseY=0;
    var windowHalfX= 0;
    var windowHalfY =0;
    var zoom = 1;
    var mouse_old_x = 0;
    var mouse_old_y = 0;
    var rotx = 0;
    var rotz = 0;
    var drag = 0;

    function onDocumentMouseMove( event ) {
        if(drag) {
            rotz += (event.clientX - mouse_old_x)*0.01;
            rotx += (event.clientY - mouse_old_y)*0.01;
        }
        mouse_old_x = event.clientX;
        mouse_old_y = event.clientY;
    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }
    document.addEventListener('mousewheel', function(e){
        zoom += e.wheelDelta*0.01;
    }, false);


    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', function() {
        drag = true;
    }, false );
    document.addEventListener( 'mouseup', function() {
        drag = false;
    }, false );
    //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    //document.addEventListener( 'touchmove', onDocumentTouchMove, false );


    this.init = function(points) {

        container = document.getElementById('canvas_3d');
        this.el = $(container);
        var width = container.clientWidth;
        var height = container.clientHeight;
        windowHalfX = width>>1;
        windowHalfY = height>>1;

        camera = new THREE.Camera();
        camera.projectionMatrix = THREE.Matrix4.makeOrtho(-width/2,
            width/2,
            -height/2,
            height/2,
            -10000,10000);
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 100;

        scene = new THREE.Scene();
        //scene.fog = new THREE.FogExp2( 0xffffff, 0.003 );

        var light, object, material;

        scene.addLight( new THREE.AmbientLight( 0xFFFFFF) );

        light = new THREE.DirectionalLight( 0xffffff, 2.0 );
        light.position.z = 1;
        scene.addLight( light );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( container.clientWidth, container.clientHeight);
        var parameters = { color: 0xffffff }
        material_base = new THREE.MeshLambertMaterial( parameters );
        //renderer.initMaterial( material_base);
        container.appendChild( renderer.domElement );

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        //document.body.appendChild( stats.domElement );

        //initPostprocessing();
        renderer.autoClear = false;

        var material = new THREE.MeshBasicMaterial( { color: 0x0, opacity: 0.0 });
        var object = new THREE.Mesh(new THREE.PlaneGeometry( width, height), material);
        object.doubleSided = true;
        object.position.x = width>>1;
        object.position.y = height>>1;
        object.position.z = -400;
        material.color.setHSV( Math.random(), 0.3, 0.1 );
        scene.addObject( object );
        self.bkg = object;

        var r = new Path(points);
        self.ribbon = r.object();
        scene.addObject(self.ribbon);

        var gui = new DAT.GUI();
        gui.add(this, 'rotation').min(0).max(100);
        gui.add(this, 'rotation_x').min(0).max(100);
        gui.add(camera.position, 'x').min(0).max(1000);
        gui.add(camera.position, 'y').min(0).max(1000);
        gui.add(camera.position, 'z').min(0).max(2000);
        animate();
        camera.useTarget = true;

        //TWEEN.start();
        new TWEEN.Tween(self.bkg.materials[0]).to({opacity: 0.98}, 2000).easing(TWEEN.Easing.Cubic.EaseOut).start();
        new TWEEN.Tween(self.ribbon.scale).to({x: 1.9, y:1.9, z: 1.9}, 1500).easing(TWEEN.Easing.Cubic.EaseInOut).start();

       textureCanvas = texture_text();
       /*
       var materialCanvas = new THREE.MeshBasicMaterial( { map: textureCanvas } );
       var ge = new THREE.PlaneGeometry(100, 100);
       var meshCanvas = new THREE.Mesh( ge, materialCanvas );
       meshCanvas.position.set(0,0, 100);
       meshCanvas.doubleSided = true;
       meshCanvas.position.x = width>>1;
       meshCanvas.position.y = height>>1;
       meshCanvas.position.z = -400;
       */

       //material = new THREE.ParticleBasicMaterial( { size: 35, sizeAttenuation: false, map: textureCanvas} );
       //var sp = new THREE.Sprite ({map: textureCanvas});
       //scene.addObject(sp);
      material = new THREE.ParticleBasicMaterial( { size: 1000, sizeAttenuation: false, map: textureCanvas} );
      //material.color.setHSV( 1.0, 0.2, 0.8 );

      var geo = new THREE.Geometry();
      geo.vertices.push(new THREE.Vertex(new THREE.Vector3(0,0, 1000)));
      particles = new THREE.ParticleSystem( geo, material );
      particles.sortParticles = true;
      particles.updateMatrix();
      scene.addObject( particles );
    }

//

    function animate() {
        requestAnimationFrame( animate );
        camera.update();
        render();
        stats.update();
        time += 0.1;
        //self.bkg.materials[0].opacity = clamp(0, 1.0, time*0.2);
        //self.ribbon.materials[0].opacity = clamp(0.9, 1.0, time*0.2);
        //mouseY = 120*clamp(0, 1.0, (time - 3.5) *0.2);
        //zoom = 1 + 0.9*clamp(0, 1.0, (time - 1.5) *0.2);
        if(time < 0.0) {
            TWEEN.update();
            rotx = self.ribbon.rotation.x;
            zoom = self.ribbon.scale.x;
        } else {
            /*self.ribbon.rotation.x = rotx;
            self.ribbon.rotation.z = rotz;*/
            rotx = time*0.1;
            /*camera.position.x = Math.cos (rotx) * 1000;
            camera.position.y = Math.sin( rotx) * 1000;
            camera.position.z = 200;
            */
            self.ribbon.scale.set(zoom, zoom, zoom);
        }

    }

    function render() {
        var timer = new Date().getTime() * 0.001;
        renderer.render( scene, camera );

    }

    this.show = function() {
        this.el.show();
    };
    this.hide = function() {
        this.el.hide();
    };

}
