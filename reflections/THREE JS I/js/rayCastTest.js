import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader();
const sizes = {
    width: 800,
    height: 600
}
const obj_texture = await loader.loadAsync('textures/silly_cat.jpg');
//need to ensure that the textures are encoded correctly - mapping the colors correctly.
obj_texture.colorSpace = THREE.SRGBColorSpace;

const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ map: obj_texture })
)
object1.position.x = -2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ map: obj_texture })
)
object2.position.x = 2


const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ map: obj_texture })
)

scene.add(object1, object2, object3)

const canvas = document.querySelector('canvas#three-ex')
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;
scene.add(camera)



const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)

window.requestAnimationFrame(animate);

function animate(timer) {
    controls.update();

    object1.position.y = Math.sin(timer / 1000 * .5) * 3
    object2.position.y = Math.sin(timer / 1000 * .4) * 3
    object3.position.y = Math.sin(timer / 1000 * .3) * 3

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)
    console.log(intersects)

    for (const object of objectsToTest) {
        object.material.color.set(0xffffff)
    }

    for (const intersect of intersects) {
        intersect.object.material.color.set(0xff0000)
    }

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

const raycaster = new THREE.Raycaster()

//ray will start somewhere on left of the spheres
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
//right (positive x)
const rayDirection = new THREE.Vector3(10, 0, 0)  //reduce magnitude BUT keep direction
console.log(rayDirection.length())
//set direction only (has length ==1)
rayDirection.normalize()
console.log(rayDirection.length())
raycaster.set(rayOrigin, rayDirection) //raycaster has been oriented