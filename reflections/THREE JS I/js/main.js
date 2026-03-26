
// library ref: because we are loading a module
import * as THREE from 'three';

//SCENE
const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();

const obj_texture = await loader.loadAsync('textures/silly_cat.jpg');
//need to ensure that the textures are encoded correctly - mapping the colors correctly.
obj_texture.colorSpace = THREE.SRGBColorSpace;

// //A: the geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// //B: the material
// const material = new THREE.MeshBasicMaterial({ color: 0x800080 });
// //C: put together
// const mesh = new THREE.Mesh(geometry, material);
// //D: ADD TO THE SCENE
// scene.add(mesh);
// const mesh_2 = new THREE.Mesh(geometry, material);
// scene.add(mesh_2);

// mesh_2.position.x = 1.5;
// mesh_2.position.y = 1.25;
// mesh_2.position.z = -1;

const sizes = {
    width: 800,
    height: 600
}

// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5


// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25


const material = new THREE.MeshBasicMaterial({
    map: obj_texture
})

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     material
// )
// sphere.position.x = - 1.5

// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     material
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.5, 0.3, 16, 32),
//     material
// )
// torus.position.x = 1.5

// // scene.add(sphere, plane, torus)
// const group = new THREE.Group()
// scene.add(group)
// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// )
// cube1.position.x = 1.5
// group.add(cube1)
// /*https://threejs.org/docs/#SphereGeometry*/
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(.75, 32, 16),
//     new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
// )
// sphere.position.y = 1.5
// sphere.position.x = 3
// group.add(sphere)

// group.position.x = -2
// group.rotation.x = Math.PI * .25
// // group.scale.x = .5
// // group.scale.y = .5
// // group.scale.z = .5
// group.scale.set(.5, .5, .5)
// //could do
// //camera.lookAt(group.position)


const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


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

// //render:
// renderer.render(scene, camera);
window.requestAnimationFrame(animate)
function animate() {
    // mesh.rotation.y += 0.01
    // renderer.render(scene, camera)
    // window.requestAnimationFrame(animate)

    let elapsedTime = 0  //
    function animate(timer) {
        //calculate the difference since last frame
        let deltaTime = timer - elapsedTime
        elapsedTime = timer //update  new elapsedTime
        camera.position.x = Math.cos(elapsedTime / 1000)
        camera.position.y = Math.sin(elapsedTime / 1000)
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)

    }

    window.requestAnimationFrame(animate);


}
//TURN ON AXES HELPER
//https://threejs.org/docs/?q=Axes#AxesHelper
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);
//move it 
axesHelper.position.x = -1;
axesHelper.position.y = -1;


