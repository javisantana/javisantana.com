
//epic moving average lpf
function LPF(initial) {
    var p0 = initial || 0;
    var p1 = initial || 0;
    this.filter = function(v) {
        var s = 0.33*(v + p0 + p1);
        p1 = p0;
        p0 = v;
        return s;
    };
}

function distanceVector(lat0, lon0, lat1, lon1) {
    var p0 = mercator_project(lat0, lon0);
    var p1 = mercator_project(lat1, lon1);
    return new THREE.Vector3( p1.x, p1.y,0).subSelf(new THREE.Vector3(p0.x, p0.y, 0));
}

function Path(points) {

    var self = this;
    var max = Math.max;
    var min = Math.min;
    var vec3 = THREE.Vector3;
    var zmax = 0;
    var zmin= Number.MAX_VALUE;
    var velmax = 0;
    var velmin = Number.MAX_VALUE;

    this.center = new THREE.Vector3(0);

    this.velocity = [];

    function calculate_center() {
        var lpf_vel = new LPF();
        var center = self.center;
        // center
        for (var i = 1; i < points.length; i++ ) {
            var x = points[i].x;
            var z = points[i].z;
            var y = points[i].y;
            var p0 = points[i - 1];
            var p1 = points[i];
            center.addSelf(new THREE.Vector3( x, y, z ));

            var dir = distanceVector(p1.lat, p1.lon, p0.lat, p0.lon);
            var vel = 3600*dir.length()/(p1.timestamp - p0.timestamp);
            vel = clamp(0, 50, vel);
            vel = lpf_vel.filter(vel);
            p1.vel = vel;
            velmax = max(velmax, vel);
            velmin = min(velmin, vel);
            zmax = max(zmax, z);
            zmin = min(zmin, z);
        }
        center.multiplyScalar(1.0/points.length);
        zmax -= center.z;
        zmin -= center.z;
        console.log('velmax', velmax);
        return center;
    }

    function create_geometry() {


        var center = self.center;
        var geometry = new THREE.Geometry();
        calculate_center();

        var lpf = new LPF(points[0].z);
        self.velocity.push(0);

        for (i = 1; i < points.length; i+=1 ) {
            var p0 = {x:i, y:0, z: 0};//points[i -1];
            var p1 = {x:i-1, y:0, z: 0};//points[i -1];
            var p0 = points[i - 1];
            var p1 = points[i];
            var old = new vec3(p0.x, p0.y, 0);

            var vector = new THREE.Vector3( p1.x, p1.y,lpf.filter(p1.z) );

            //get "normal"
            var dir = new THREE.Vector3().sub(vector, new THREE.Vector3(p0.x, p0.y, 0 ));
            vector.subSelf(center);
            //dir.normalize();
            var orto = new THREE.Vector3(-dir.y, dir.x, 0);
            //var orto = new THREE.Vector3().cross(vector, new vec3(0,0, 1));
            //orto.setLength(2*(2*(i%2) -1));
            var v = (p1.vel - velmin)/(velmax - velmin);
            orto.setLength(3*v);
            var v1 = new THREE.Vertex(new THREE.Vector3().add(vector, orto));
            var v2 = new THREE.Vertex(new THREE.Vector3().add(vector, orto.multiplyScalar(-1)));
            geometry.vertices.push(v1);
            geometry.vertices.push(v2);

            color = new THREE.Color( 0xffffff);
            //color.setHSV(0.2 + 0.4*(vector.z - zmin)/(zmax- zmin), 0.6, 0.7);
            //color.setHSV(vel*1000.0, 0.6, 0.7);
            //color.setHSV(10*(i%2), 0.6, 0.7);
            geometry.colors.push( color );
            //color = new THREE.Color( 0xff0000 );
            //color.setHSV(10*((i+1)%2), 0.6, 0.7);
            geometry.colors.push( color );

         }
         return geometry;
     }

     this.object = function() {
         var geometry = create_geometry();
         
         var material = new THREE.MeshBasicMaterial( { color:0xffffff,vertexColors:true } );
         //var material = new THREE.MeshBasicMaterial( { color:0xffffff, wireframe:true} );
         var ribbon = new THREE.Ribbon(geometry, material );
         //ribbon.position = self.center.clone();
         ribbon.rotation.set( 0, 0, 0 );
         ribbon.scale.set(1,1,1);
         ribbon.doubleSided = true;
         ////this.object = ribbon;
         return ribbon;
     }
}
