"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Huyen Tran
// Baymax in Wonderland
// COMP 320
// 14 December 2021
////////////////////////////////////////////////////////////////////////////////

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var walking = false;

var camera, scene, renderer;
var cameraControls;
var bevelRadius = 1.9;
var clock = new THREE.Clock();
var cylinder,sphere,cube;
var baymax;

function fillScene() {
	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog( 0xAAAAAA, 3000, 5000 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );
	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 400, 500 );
	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, 250, -200 );
	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);

	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 1000, 500 );
	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, -1000, -200 );

	//BACKGROUND SET UP
	addBackground();

	// Baymax
	baymax = new THREE.Object3D();
	createBaymax( baymax );
	baymax.position.y +=40;
	baymax.scale.set(1.5,1.5,1.5);
	scene.add( baymax );

}

function addBackground(){
var texture = THREE.ImageUtils.loadTexture("../textures/snowOnly.png");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

//ground
var solidGround = new THREE.Mesh(
	new THREE.PlaneGeometry( 3000, 3000, 100, 100 ),
	new THREE.MeshLambertMaterial( { map: texture} ) );
solidGround.rotation.x = - Math.PI / 2;
solidGround.rotation.z = - Math.PI / 2;

scene.add( solidGround );

//sky
var texture = THREE.ImageUtils.loadTexture("../textures/snowSky.png");
var sky = new THREE.Mesh(
	new THREE.PlaneGeometry( 3000, 3000, 100, 100 ),
	new THREE.MeshLambertMaterial( { map: texture} ) );

sky.rotation.x = Math.PI/2;
sky.rotation.z = - Math.PI / 2;
sky.position.set(0,1500,0);

scene.add( sky);

//back wall
var texture = THREE.ImageUtils.loadTexture("../textures/daytimeXmasSky.jpeg");

//texture.repeat.set(2,2);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

var backWall = new THREE.Mesh(
	new THREE.PlaneGeometry( 3000, 1500, 100, 100 ),
	new THREE.MeshLambertMaterial( { map: texture} ) );
backWall.position.set(1500,750,0);
backWall.rotation.y = - Math.PI / 2;

scene.add( backWall );

//left wall
var texture = THREE.ImageUtils.loadTexture("../textures/daytimeXmasSky.jpeg");

texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

var leftWall = new THREE.Mesh(
	new THREE.PlaneGeometry( 3000, 1500, 100, 100 ),
	new THREE.MeshLambertMaterial( { map: texture} ) );
leftWall.position.set(0,750,-1500);

scene.add( leftWall );

//right wall
var texture = THREE.ImageUtils.loadTexture("../textures/daytimeXmasSky.jpeg");

texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

var rightWall = new THREE.Mesh(
	new THREE.PlaneGeometry( 3000, 1500, 100, 100 ),
	new THREE.MeshLambertMaterial( { map: texture} ) );
rightWall.position.set(0,750,1500);
rightWall.rotation.y = Math.PI;

scene.add( rightWall );

//add sun
var sun = new THREE.Mesh(
	new THREE.SphereGeometry( 100, 32, 16 ),
	new THREE.MeshPhongMaterial( {color: 0xf0e47d, shininess: 100} ) )

sun.position.set(500, 1300,-1450);
scene.add( sun);

//add trees
var texture = THREE.ImageUtils.loadTexture("../textures/ornaments.png");
texture.repeat.set(4,4);
texture.wrapS = THREE.RepeatMirrorWrapping;
texture.wrapT = THREE.RepeatWrapping;

var tree1 = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0x61b89f});
createTree(tree1, treeMat );
tree1.scale.set(12,12,12);
tree1.position.y = 450;
tree1.position.x = 1300;
tree1.position.z = 1300;
scene.add(tree1);

//front left tree
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0xbaffeb});
createTree(tree, treeMat );
tree.scale.set(5,5,5);
tree.position.set(-1000,200, -1000);
tree.rotation.y = 45 *  Math.PI / 180;
scene.add(tree);

//big blue tree
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0x6bbcff});
createTree(tree, treeMat );
tree.scale.set(10,10,10);
tree.position.set(-1100, 400,-1200);
scene.add(tree);

//front right tree
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0xc4feff});
createTree(tree, treeMat );
tree.scale.set(5,5,5);
tree.position.set(500,200, -1000);
tree.rotation.y = 45 *  Math.PI / 180;
scene.add(tree);

//middle green tree
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0x7ac27f});
createTree(tree, treeMat );
tree.scale.set(10,10,10);
tree.position.set(500, 400,-1200);
scene.add(tree);

var snowman = new THREE.Object3D();
makeSnowman(snowman);
snowman.scale.set(3,3,3);
snowman.position.set(-1200,40, -1000);
snowman.rotation.y = 75 * Math.PI / 180;
scene.add(snowman);

//white tree
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF});
createTree(tree, treeMat );
tree.scale.set(10,10,10);
tree.position.set(1200, 400, 1100);
tree.rotation.y = -90 *  Math.PI / 180;
scene.add(tree);

//back left corner tree

var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0xc0e0fa});
createTree(tree, treeMat );
tree.scale.set(20,20,20);
tree.position.y = 800;
tree.position.x = 1200;
tree.position.z = -1100;
scene.add(tree);

//small tree next to it
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0x5694c7});
createTree(tree, treeMat );
tree.scale.set(10,10,10);
tree.position.set(1000, 400, -750);
tree.rotation.y = -90 *  Math.PI / 180;
scene.add(tree);

//front right corner tree
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0xFFFFFF});
createTree(tree, treeMat );
tree.scale.set(10,10,10);
tree.position.set(-1200, 400, 1100);
scene.add(tree);

//small tree next to it
var tree = new THREE.Object3D();
var treeMat = new THREE.MeshLambertMaterial({ color: 0x5694c7});
createTree(tree, treeMat );
tree.scale.set(5,5,5);
tree.position.set(-1000, 200, 900);
tree.rotation.y = -90 *  Math.PI / 180;
scene.add(tree);


var snowman = new THREE.Object3D();
makeSnowman(snowman);
snowman.scale.set(3,3,3);
snowman.position.set(800,50, 1100);
scene.add(snowman);

//left bench
var bench = new THREE.Object3D();
createBench(bench);
bench.scale.set(3,3,3);
bench.position.set(0, 150, -1100)
scene.add(bench);

//right bench
var bench = new THREE.Object3D();
createBench(bench);
bench.scale.set(3,3,3);
bench.rotation.y = 180 * Math.PI / 180;
bench.position.set(0, 150, 1100)
scene.add(bench);

//back bench
var bench = new THREE.Object3D();
createBench(bench);
bench.scale.set(3,3,3);
bench.rotation.y = -90 * Math.PI / 180;
bench.position.set(1100, 150, 0)
scene.add(bench);

createSkatingRink();

}

function createSkatingRink(){
	var rink = new THREE.Mesh(
							new THREE.CubeGeometry(1500, 10, 1500),
							new THREE.MeshPhongMaterial( {color: 0xFFFFFF, opacity: 1, transparent: true}));
	rink.position.set(-200,15,0);
	scene.add(rink);
	var rink = new THREE.Mesh(
							new THREE.CubeGeometry(1500, 50, 1500),
							new THREE.MeshPhongMaterial( {color: 0xccdfff, opacity: 0.5, transparent: true}));
	rink.position.set(-200,0,0);
	scene.add(rink);
}

function createBench(bench){
	var texture = THREE.ImageUtils.loadTexture("../textures/wood.png");
	var top = new THREE.Mesh(
							new THREE.CubeGeometry(200,50,10),
							new THREE.MeshPhongMaterial( { color: 0x9c7e67, map:texture} ));

	top.position.set(0,0,0);
	bench.add(top);

	var bottom = new THREE.Mesh(
							new THREE.CubeGeometry(200,50,10),
							new THREE.MeshPhongMaterial( { color: 0x9c7e67, map:texture} ));
	bottom.rotation.x = 90 * Math.PI / 180;
	bottom.position.set(0,-25,20);
	bench.add(bottom);

	//legs
	var leg = new THREE.Mesh(
							new THREE.CubeGeometry(10,40,50),
							new THREE.MeshPhongMaterial( { color: 0x9c7e67, map:texture} ));
	//leg.rotation.x = 90 * Math.PI / 180;
	leg.position.set(-85,-45,20);
	bench.add(leg);

	//legs
	var leg = new THREE.Mesh(
							new THREE.CubeGeometry(10,40,50),
							new THREE.MeshPhongMaterial( { color: 0x9c7e67, map:texture} ));
	//leg.rotation.x = 90 * Math.PI / 180;
	leg.position.set(85,-45,20);
	bench.add(leg);

	var heart = new THREE.Object3D();
	var controlPoints = [ [0,0,0], //start
	                      [1,1,0],
	                      [1,3,0],
	                      [0,2,0] ]; //end
	var curveGeom = TW.createBezierCurve(controlPoints,20);
	var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.red,
	                                              linewidth: 3 } );
	var curve = new THREE.Line( curveGeom, curveMat );
	heart.add(curve);

	function showCP(cpList) {
	    for( var i=0; i < cpList.length; i++ ) {
	        scene.add(TW.createPoint(cpList[i]));
	    }
	};

	var curve2 = curve.clone();
	curve2.scale.set(-1,1,1);
	heart.add(curve2);
	heart.scale.set(10,6,6);
	heart.scale.set(50,50, 50);
	heart.position.set(0, 50, 0);
	bench.add(heart);
}

function makeSnowman(snowman){
	//bottom
	var base = new THREE.Mesh(
							new THREE.SphereGeometry(30,30,32),
							new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ));
	base.position.set(0,15,0);
	snowman.add(base);
	//mid
	var base = new THREE.Mesh(
							new THREE.SphereGeometry(20,30,32),
							new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ));
	base.position.set(0,50,0);
	snowman.add(base);
	//top
	var base = new THREE.Mesh(
							new THREE.SphereGeometry(15,30,32),
							new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ));
	base.position.set(0,75,0);
	snowman.add(base);

	//left eyes
	var base = new THREE.Mesh(
							new THREE.SphereGeometry(2,30,32),
							new THREE.MeshPhongMaterial( { color: 0x000000 } ));
	base.position.set(-14,78,-6);
	snowman.add(base);

	//right eyes
	var base = new THREE.Mesh(
							new THREE.SphereGeometry(2,30,32),
							new THREE.MeshPhongMaterial( { color: 0x000000 } ));
	base.position.set(-14,78,6);
	snowman.add(base);

	//carrot nose
	var nose = new THREE.Mesh(
							new THREE.CylinderGeometry(0,3,10,30),
							new THREE.MeshPhongMaterial( { color: 0xf09c00 } ));
	nose.position.set(-18,75, 0);
	nose.rotation.z= 90 * Math.PI / 180;
	snowman.add(nose);

 	//rim
	var hat = new THREE.Mesh(
							new THREE.CylinderGeometry(15,15,2,30),
							new THREE.MeshPhongMaterial( { color: 0x000000 } ));
	hat.position.set(0,90, 0);
	snowman.add(hat);
	//top hat
	var hat = new THREE.Mesh(
							new THREE.CylinderGeometry(10,10,15,30),
							new THREE.MeshPhongMaterial( { color: 0x000000 } ));
	hat.position.set(0,98, 0);
	snowman.add(hat);
}

function createTree(tree, material){
	var cone = new THREE.Mesh( new THREE.CylinderGeometry(0,20,60,30), material);
	tree.add(cone);

	var base = new THREE.Mesh(
							new THREE.CylinderGeometry(5,5,20,30),
							new THREE.MeshPhongMaterial( { color: 0x615959 } ));
	base.position.y -=30;
	tree.add(base);

	//snow / ornaments
	var snow = new THREE.Mesh(
							new THREE.SphereGeometry(3, 30,32),
							new THREE.MeshPhongMaterial( { color: 0xfced65 } ));
	snow.position.set(0,32,0);
	tree.add(snow);

	//add presents
	var texture = THREE.ImageUtils.loadTexture("../textures/xmasHat.png");
	var present = new THREE.Mesh(
							new THREE.CubeGeometry(40,30,30),
							new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map:texture} ));
	present.scale.set(0.2,0.2,0.2);
	present.position.set(-20,-38, 0)
	tree.add(present);

	var texture = THREE.ImageUtils.loadTexture("../textures/greenpolkadot.png");
	var present = new THREE.Mesh(
							new THREE.CubeGeometry(15,35,30),
							new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map:texture} ));
	present.scale.set(0.2,0.2,0.2);
	present.position.set(-15,-37, 10)
	tree.add(present);

	var present = new THREE.Mesh(
							new THREE.CylinderGeometry(5,5,20,30),
							new THREE.MeshPhongMaterial( { color: 0xfffd6b } ));
	present.scale.set(0.5,0.5,0.5);
	present.position.set(-20,-37, 6);
	tree.add(present);
}

function createSupport( bsupport ) {
	var material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, specular: 0xF4C154, shininess: 100 } );

	var cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 25, 10, 30, 32 ), material );
  cylinder.position.x = -25;
  cylinder.position.y = -130;
  cylinder.position.z = -50;
	bsupport.add( cylinder );

	var cylinder = new THREE.Mesh(
	  new THREE.CylinderGeometry( 15, 25, 50, 32 ), material );
	cylinder.position.x = -25;
	cylinder.position.y = -90;
	cylinder.position.z = -50;
	bsupport.add( cylinder );

	var cylinder = new THREE.Mesh(
	  new THREE.CylinderGeometry( 5, 15, 15, 32 ), material );
	cylinder.position.x = -25;
	cylinder.position.y = -60;
	cylinder.position.z = -50;
	bsupport.add( cylinder );

	var cylinder = new THREE.Mesh(
	  new THREE.CylinderGeometry( 25, 10, 30, 32 ), material );
	cylinder.position.x = -25;
	cylinder.position.y = -130;
	cylinder.position.z = 50;
	bsupport.add( cylinder );

	var cylinder = new THREE.Mesh(
	new THREE.CylinderGeometry( 15, 25, 50, 32 ), material );
	cylinder.position.x = -25;
	cylinder.position.y = -90;
	cylinder.position.z = 50;
	bsupport.add( cylinder );

	var cylinder = new THREE.Mesh(
	new THREE.CylinderGeometry( 5, 15, 15, 32 ), material );
	cylinder.position.x = -25;
	cylinder.position.y = -60;
	cylinder.position.z = 50;
	bsupport.add( cylinder );

	bsupport.position.y += 175;
	bsupport.position.x += 20;

	var rLeg = new THREE.Mesh(
		new THREE.CylinderGeometry(20,15,30,30), material );
	//rLeg.rotation.x = 90 * Math.PI/180;
  rLeg.position.x = -30;
  rLeg.position.z = -25;
	rLeg.position.y -= 170;
	bsupport.add( rLeg );

  var lLeg = new THREE.Mesh(
		new THREE.CylinderGeometry(20,15,30,30), material );
	//rLeg.rotation.x = 90 * Math.PI/180;
  lLeg.position.x = -30;
  lLeg.position.z = 25;
	lLeg.position.y -= 170;
	bsupport.add( lLeg );

}

// Body of Baymax
function createBody(bbody) {
	var material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, specular: 0x279933, shininess: 100 } );
	var length = 60;
	var cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 70, 30, length/2, 18 ), material );
	cylinder.position.y = length/4;
  cylinder.position.y += 5;
	bbody.add( cylinder );

  var cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 60, 70, length, 18 ), material );
	cylinder.position.y = length/4;
  cylinder.position.y += 5 + length/2 + length/4;
	bbody.add( cylinder );

	cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 30, 60, 50, 18 ), material );
	cylinder.position.y = 120;
  //cylinder.position.y += 60;
	bbody.add( cylinder );

}

// Head of the baymax - head
function createHead(bhead) {
	var material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, specular: 0x95E4FB, shininess: 100 } );

	//face
  var cylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 20, 20, 30, 32 ), material );
	cylinder.rotation.x = 90 * Math.PI/180;
	cylinder.position.y = 105;
  cylinder.position.z = 0;
	bhead.add( cylinder );

	//left eye
	var lEye = new THREE.Mesh(
		new THREE.SphereGeometry( 5, 32, 16 ),
		new THREE.MeshPhongMaterial( {color: 0x000000} ) );
	// place sphere at end of arm
	lEye.position.y = 106;
  lEye.position.z = -12;
	lEye.position.x = -18;
	bhead.add( lEye);

	//right eye
	var rEye = new THREE.Mesh(
		new THREE.SphereGeometry( 5, 32, 16 ),
		new THREE.MeshPhongMaterial( {color: 0x000000} ) );
	// place sphere at end of arm
	rEye.position.y = 106;
  rEye.position.z = 12;
	rEye.position.x = -18;
	bhead.add( rEye);

	//add mouth
	var controlPoints = [ [-2,0,0], //start
	                      [-1,-0.75,0],
	                      [1,-0.75,0],
	                      [2,0,0] ]; //end
	var curveGeom = TW.createBezierCurve(controlPoints,20);
	var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.black,
	                                              linewidth: 100 } );
	var curve = new THREE.Line( curveGeom, curveMat );


	function showCP(cpList) {
	    for( var i=0; i < cpList.length; i++ ) {
	        scene.add(TW.createPoint(cpList[i]));
	    }
	};

	var curve2 = curve.clone();
	curve2.position.y = 108;
	curve2.position.x = -20;
	curve2.rotation.y = Math.PI/2;

	curve2.scale.set(-8,8,8);
	bhead.add(curve2);

	//side of face
	var sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 20, 32, 16 ), material );
	// place sphere at end of arm
	sphere.position.y = 105;
  sphere.position.z = -15;
  sphere.position.x -= 0;
	bhead.add( sphere );

  var sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 20, 32, 16 ), material );
	// place sphere at end of arm
	sphere.position.y = 105;
  sphere.position.z = 15;
  sphere.position.x -= 0;
	bhead.add( sphere );
	bhead.position.y +=55;

	//cute xmas hat
	var texture = THREE.ImageUtils.loadTexture("../textures/xmasHat.png");
	var hat = new THREE.Mesh(
		new THREE.CylinderGeometry( 0, 15, 30,32 ),
	new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map:texture } ) );
	// place sphere at end of arm
	hat.position.y = 140;
  hat.position.z = 0;
  hat.position.x -= 0;

	var heart = new THREE.Object3D();
	var controlPoints = [ [0,0,0], //start
	                      [1,1,0],
	                      [1,3,0],
	                      [0,2,0] ]; //end
	var curveGeom = TW.createBezierCurve(controlPoints,20);
	var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.red,
	                                              linewidth: 3 } );
	var curve = new THREE.Line( curveGeom, curveMat );
	heart.add(curve);

	function showCP(cpList) {
	    for( var i=0; i < cpList.length; i++ ) {
	        scene.add(TW.createPoint(cpList[i]));
	    }
	};

	var curve2 = curve.clone();
	curve2.scale.set(-1,1,1);
	heart.add(curve2);
	heart.scale.set(8,6,6);
	heart.rotation.y = Math.PI/2;
	heart.position.set(0, 13, 0);
	hat.add(heart);

	bhead.add( hat );



}

function createBaymax(bmax) {
	var support = new THREE.Object3D();
	var body = new THREE.Object3D();
	var head = new THREE.Object3D();

	// MODELS
	// base + legs + feet
	createSupport(support);

	// body
	createBody(body);

	// head + hat
	createHead(head);

	// make moving piece

	var bodyhead = new THREE.Object3D();
	bodyhead.add(body);
	bodyhead.add(head);

	bmax.add(support);
	bmax.add(bodyhead);
}

function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColorHex( 0xAAAAAA, 1.0 );

	var container = document.getElementById('container');
	container.appendChild( renderer.domElement );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 38, canvasRatio, 1, 10000 );
	camera.position.set( -510, 240, 100 );

	// CONTROLS
	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0,120,0);
	//camera.position.set(-102, 177, 20);
	cameraControls.target.set(-13, 60, 2);
	fillScene();

}

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function animate() {
	window.requestAnimationFrame(animate);
	render();
	update();
}

function update()
{
	// delta = change in time since last call (seconds)
	var delta = clock.getDelta()*20;
	var moveDistance = 100 * 0.05;
	walking = false;

	// move forwards / backwards
	if ( keyboard.pressed("left") ){
		baymax.rotation.y += delta;
    //camera.position.z -= moveDistance/2;
  }
	if ( keyboard.pressed("right") )
		baymax.rotation.y -= delta;
	// rotate left/right
	if ( keyboard.pressed("up") )
		{
			baymax.translateX(-moveDistance);
		}
	if ( keyboard.pressed("down") )
		{
			baymax.translateX(moveDistance);
      //camera.translateX(-moveDistance/4);
		}



	var walkingKeys = ["up", "down", "left", "right"];
	for (var i = 0; i < walkingKeys.length; i++)
	{
		if ( keyboard.pressed(walkingKeys[i]) )
			walking = true;
	}

}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);

	renderer.render(scene, camera);
}

try {
	init();
	fillScene();
	addToDOM();
	animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}
