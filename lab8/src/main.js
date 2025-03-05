// Import all the function from the three.js library
import * as THREE from 'three';

//1 ) Create a scene 
// A scene is a container that holds 
// all the objects, cameras, and lights that make up the 3D world.
const scene = new THREE.Scene();

//2 ) Create a camera to view the scene
// The camera is the perspective from which the scene is viewed.
// The camera is positioned at (0, 0, 0) by default.
// 75 is the field of view in degrees. (degree of the camera)
// window.innerWidth / window.innerHeight is the aspect ratio.

const camera = new THREE.PerspectiveCamera(75, 
window.innerWidth / window.innerHeight, 0.1, 1000);
// x = 0 y = 0, z = 20
camera.position.set(0,0,20); // Bring out the camera out of the scene

//3 ) Create a renderer
// The renderer renders the scene using the camera’s perspective.
// ANd it displays the result on the body element in HTML

// Show the scene in the  element of id bg
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("bg")});
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);



renderer.setPixelRatio(window.devicePixelRatio); 
// Set the pixel ratio of the renderer to the device

//4 ) Create a geometry

// Add a Cube Object
// A geometry is a blueprint for creating an object.
// The box has a width, height, and depth of 1 unit. [Size of the cube] [1,1,1]
const geometry = new THREE.BoxGeometry( 5, 5, 5 ); 

// Material of the Surface of the cube
//const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
// To see the difference wih light, use Standard Material
const material = new THREE.MeshStandardMaterial( {color: 0xff00ff} );

// Load the texture coming from the file muzz.jpg
const myTexture = new THREE.TextureLoader().load('assets/muzz.jpg');
material.map = myTexture; // Apply the texture to the cube

const cube = new THREE.Mesh( geometry, material ); 

cube.position.set(2,0,-5); // Set the position of the cube
scene.add( cube );

// Add Torus Geometry
//  radius, tube, radialSegments, tubularSegments
const torusGeometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
// Basic vs Standard Material 
const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xff6347} );

const torus = new THREE.Mesh( torusGeometry, torusMaterial ); 
torus.position.set(0,0,-5); // Set the position of the torus (default is 0,0,0)
scene.add( torus )

// Add Sphere Geometry

// radius, width , height
const sphereGeometry = new THREE.SphereGeometry( 3, 32, 32 ); 
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 

const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg');
sphereMaterial.map = moonTexture; // Apply the texture to the sphere

const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial ); 
scene.add( sphere );
sphere.position.set(-20,5,-5); // Set the position of the sphere


// 5 ) Add Lightning to the cube
const light = new THREE.DirectionalLight( 0xffffff, 1 ); // white light intensity 1
light.position.set(2,2,2); // x,y,z position of the light
scene.add( light );

// 6) Add Texture to the scene  (background picture)
const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
// Add it to the scene
scene.background = spaceTexture;

// 7) Add Random Stars to the Scene (Sphere Geometry)
let starArrays = [];

function addStar(){
    // 0.25 radius, 24 width, 24 height
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    // Material of the star (color of the star is white)
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    // Create the star from the given geometry and material
    const star = new THREE.Mesh(geometry, material);

    // Random Position of the star
    // Create a random number between -50 and 50
    // Add it inside an array of 3 elements, for x,y,z (10,-3,49)
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    starArrays.push(star);
    scene.add(star);
}
// Create 200 stars
 Array(200).fill().forEach(addStar);


// THIS SHOULD BE THE LAST LINE - SHOW IT IN THE BROWSER
const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01; // Every xx ms , rotate the cube by 0.01 radian
    cube.rotation.x += 0.01; // Every xx ms , rotate the cube by 0.01 radian

    torus.rotation.y += 0.01; // Every xx ms , rotate the cube by 0.01 radian
    torus.rotation.x += 0.01; // Every xx ms , rotate the cube by 0.01 radian 

    sphere.rotation.y += 0.01; // Every xx ms , rotate the cube by 0.01 radian
    sphere.rotation.x += 0.01; // Every xx ms , rotate the cube by 0.01 radian

    starArrays.forEach((star) => {
    star.rotation.y += 0.01; // Every xx ms , rotate the cube by 0.01 radian
    star.rotation.x += 0.01; // Every xx ms , rotate the cube by 0.01 radian
    })

    // Show the scene with the camera
    renderer.render(scene, camera);
}
animate();

function moveCamera(){
    // Retrievieng the x and y position on the body in the browser screen
    // As I scroll the down the page, the position of y will increase
    // As I scroll to the left on the page, the position of x will increase
    const t = document.body.getBoundingClientRect().top;

    // Rotate the camera on the x axis
    camera.position.z = t * -0.01; // Move the camera on the z axis by -0.01
    camera.position.x = t * -0.0002; // Move the camera on the x axis by -0.0002
    camera.rotation.y = t * -0.0002; // Rotate the camera on the y axis by -0.0002
  
}
// When the page is scrolled, move the camera closer to the scene
document.body.onscroll = moveCamera;
    