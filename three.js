import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// resize window update
window.addEventListener("resize", function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// // Camera positioning
// camera.position.set(6, 8, 14);
// orbit.update();

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

/* -------------------------------------------------------------------------- */
const hdrTextureURL = new URL("hdri/MR_INT-005_WhiteNeons_NAD.hdr", import.meta.url);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;
camera.position.z = 5;

const loader = new RGBELoader();
loader.load(hdrTextureURL, function (texture) {
	texture.mapping = THREE.EquirectangularReflectionMapping;
	scene.background = texture;
	scene.environment = texture;

	const geometry = new THREE.Mesh(
		new THREE.SphereGeometry(1, 30, 30),
		new THREE.MeshStandardMaterial({
			color: 0x00ff00,
			metalness: 1.0,
			roughness: 0.1,
		})
	);
	scene.add(geometry);

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);

		geometry.rotation.x += 0.01;
		geometry.rotation.y += 0.01;
	}
	// renderer.setAnimationLoop(animate);
	animate();
});

/* -------------------------------------------------------------------------- */
