import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import Navbar from '../components/Navbar';

const ARViewer = () => {
	const containerRef = useRef(null);
	const location = useLocation();

	// Extract model URL and description from query params
	const params = new URLSearchParams(location.search);
	const modelUrl = params.get('model') || '/models/default.glb';
	const description =
		params.get('description') || 'An ancient artifact.';

	let artifactModel = null;

	useEffect(() => {
		const scene = new THREE.Scene();
		const light = new THREE.AmbientLight(0xffffff, 1.5);
		const directionalLight = new THREE.DirectionalLight(
			0xffffff,
			3
		);
		directionalLight.position.set(1, 1, 1);
		scene.add(light, directionalLight);

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		scene.add(camera);

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.xr.enabled = true;

		if (containerRef.current) {
			containerRef.current.appendChild(renderer.domElement);
		}

		document.body.appendChild(ARButton.createButton(renderer));

		const loader = new GLTFLoader();
		loader.load(
			modelUrl,
			(gltf) => {
				artifactModel = gltf.scene;
				artifactModel.scale.set(0.5, 0.5, 0.5);
				artifactModel.position.set(0, 0, -1);
				scene.add(artifactModel);
			},
			undefined,
			(error) => {
				console.error('Error loading GLTF model:', error);
			}
		);

		const fontLoader = new FontLoader();
		fontLoader.load(
			'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
			(font) => {
				const textMaterial = new THREE.MeshStandardMaterial({
					color: 0xffffff,
				});

				// Description Text (Dynamic)
				const descriptionGeometry = new TextGeometry(
					description,
					{
						font: font,
						size: 0.03, // Decrease the font size
						height: 0.005, // Reduce text thickness
					}
				);

				// Compute text bounding box to center it on the X-axis
				descriptionGeometry.computeBoundingBox();
				const textWidth =
					descriptionGeometry.boundingBox.max.x -
					descriptionGeometry.boundingBox.min.x;

				const descriptionMesh = new THREE.Mesh(
					descriptionGeometry,
					textMaterial
				);

				// Center the text on the X-axis
				descriptionMesh.position.set(-textWidth / 2, 0.15, -1);

				scene.add(descriptionMesh);
			}
		);

		const controller = renderer.xr.getController(0);
		scene.add(controller);

		controller.addEventListener('selectstart', () => {
			if (artifactModel) {
				artifactModel.rotation.y += Math.PI / 4;
			}
		});

		renderer.setAnimationLoop(() => {
			if (artifactModel) {
				artifactModel.rotation.y += 0.01;
			}
			renderer.render(scene, camera);
		});

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.setAnimationLoop(null);
			if (containerRef.current) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, [modelUrl, description]);

	return (
		<div>
			<Navbar />
			<div
				ref={containerRef}
				className="bg-black w-[100vw] h-[100vh]"
			/>
		</div>
	);
};

export default ARViewer;
