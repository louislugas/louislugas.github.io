//make new scene
const scene = new THREE.Scene();

var clock = new THREE.Clock();
var keyboard = new KeyboardState();


//make new camera (field-of-view, aspect-ratio, near-clipping, far-clipping)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//make new renderer
const renderer = new THREE.WebGLRenderer();

//set renderer size to window size
renderer.setSize(window.innerWidth, window.innerHeight);

//append renderer into body
document.body.appendChild(renderer.domElement);

//make geometry -- (BOX)
const geometry = new THREE.PlaneGeometry(1,1);
//groundplane
const groundgeo = new THREE.PlaneGeometry(10,10);

//make material for box
const material = new THREE.MeshBasicMaterial({
  color:'steelblue',
  side:THREE.DoubleSide
});
const groundmat = new THREE.MeshBasicMaterial({
  color:'indianred',
  side:THREE.DoubleSide
});

//assign the geometry + material into one mesh (cube)
const plane = new THREE.Mesh(geometry,material);
const ground = new THREE.Mesh(groundgeo,groundmat);

//add cube to scene
scene.add(plane,ground)

controls = new THREE.OrbitControls( camera, renderer.domElement );

//set camera position (x,y,z)
plane.lookAt(0,-5,5);
plane.position = new THREE.Vector3();
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0.5;
camera.position.set( 0, -5, 5);
camera.lookAt(0,0,0);

/*If you copied the code from above into the HTML file we created earlier, you wouldn't be able to see anything. This is because we're not actually rendering anything yet. For that, we need what's called a render or animate loop.*/

animate()

function animate() {
  requestAnimationFrame( animate );
  
	render();		
	update();
}

function update() {
	keyboard.update();
    direction = plane.getWorldPosition(plane.position);

	var moveDistance = 10 * clock.getDelta(); 
    /*
	if ( keyboard.down("left") ) 
		plane.translateX( -5 );
		
	if ( keyboard.down("right") ) 
		plane.translateX(  5 );
    */
	if ( keyboard.pressed("A") )
        plane.position.add(direction.multiplyScalar(-moveDistance));
    
    if ( keyboard.pressed("S") )
        plane.translateZ( moveDistance );
		
	if ( keyboard.pressed("D") )
		plane.translateX(  moveDistance );

    if ( keyboard.pressed("W") )
        plane.translateZ( -moveDistance );
		
	if ( keyboard.down("R") )
		plane.material.color = new THREE.Color(0xff0000);
	if ( keyboard.up("R") )
		plane.material.color = new THREE.Color('steelblue');
		
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}


