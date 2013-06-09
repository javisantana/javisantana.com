
function Controller() {
    this.controls = {
        left: false,
        right: false,
        fire: false,
        up: false,
        down: false
    };
};


function local_controller(c) {
    window.addEventListener('keyup', function(e) {
        if(e.keyCode == 38) {
            c.controls.up= false;
        }
        else if(e.keyCode == 40) {
            c.controls.down = false;
        }
        else if(e.keyCode == 37) { //left
            c.controls.left = false;
        } else if(e.keyCode == 39) { // right
            c.controls.right= false;
        } else if(e.keyCode == 32) {
            c.controls.fire = false;
        }
    });
    window.addEventListener('keydown', function(e) {
        if(e.keyCode == 38) {
            c.controls.up= true;
        }
        else if(e.keyCode == 40) {
            c.controls.down = true;
        }
        else if(e.keyCode == 37) { //left
            c.controls.left = true;
        } else if(e.keyCode == 39) { // right
            c.controls.right= true;
        } else if(e.keyCode == 32) {
            c.controls.fire = true;
        }
    });
}
