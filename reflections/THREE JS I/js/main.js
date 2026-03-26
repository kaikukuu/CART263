
// library ref: because we are loading a module
import * as THREE from 'three';

//SCENE
const scene = new THREE.Scene();

//A: the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
//B: the material
const material = new THREE.MeshBasicMaterial({ color: 0x800080 });
//C: put together
const mesh = new THREE.Mesh(geometry, material);
//D: ADD TO THE SCENE
scene.add(mesh);

const sizes = {
    width: 800,
    height: 600
}

mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5


mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25


const mesh_2 = new THREE.Mesh(geometry, material);
scene.add(mesh_2);
mesh_2.position.x = 1.5;
mesh_2.position.y = 1.25;
mesh_2.position.z = -1;

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);



//Access the Canvas
const canvas = document.querySelector('canvas#three-ex');
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
//move camera
camera.position.z = 3;
//give it the size

camera.lookAt(new THREE.Vector3(0, - 1, 0))
// //or
// camera.lookAt(mesh_2.position)

renderer.setSize(sizes.width, sizes.height);

//render:
renderer.render(scene, camera);

//TURN ON AXES HELPER
//https://threejs.org/docs/?q=Axes#AxesHelper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);
//move it 
axesHelper.position.x = -1;
axesHelper.position.y = -1;


