import { GLTFLoader } from './GLTFLoader.js';

const scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/window.innerHeight, 
    0.1, 
    1000
);

let renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('#bg'),
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio/1);

//const geometry = new THREE.BoxGeometry(3,3,3)
//const material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

//start adding object
var loader = new GLTFLoader();

var ducky;
loader.load("ducky.glb",function(gltf){
    ducky = gltf.scene;

    ducky.scale.set(.5,.5,.5);
    
    scene.add(gltf.scene);
});


//var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2.5);
var light = new THREE.PointLight(0xffffff, .8);
scene.add(light);

var fill = new THREE.AmbientLight(0xffffff,.5);
scene.add(fill);

light.position.set(1,1,5);

//set camera position
camera.position.z= 5;



scene.background = new THREE.Color( 0x009FB7 );

function animate(){
    requestAnimationFrame(animate);

    ducky.rotation.y +=.05;
    //ducky.scale.x += .03;

    renderer.render(scene, camera);
}

function onResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener('resize', onResize, false);

//used to cast mouse position in 3d space
var raycaster = new THREE.Raycaster()
//stores mouse location
var mouse = new THREE.Vector2();

//mouse control!!! responds to a click eventListener just below
function whenClick(event){
    console.log('click called');
    event.preventDefault();

    //used to calculate mouse position
    mouse.x = (event.clientX/window.innerWidth)*2-1;
    mouse.y = (event.clientY/window.innerHeight)*2+1;

    raycaster.setFromCamera(mouse,camera);
    //returns array of objects that intersected the raycaster
    var intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects.length);
    for(var i = 0; i<intersects.length; i++){
        intersects[i].object.size.set(10,10,10);
        
    }
}
window.addEventListener('click', whenClick);

animate();
