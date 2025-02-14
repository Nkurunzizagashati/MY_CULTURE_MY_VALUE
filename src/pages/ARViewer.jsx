import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const ARViewer = () => {
	const containerRef = useRef(null);
	let axeModel = null;
	let textMesh = null;
	let descriptionMesh = null;

	useEffect(() => {
		const scene = new THREE.Scene();

		// Lighting
		const light = new THREE.AmbientLight(0xffffff, 1.5);
		const directionalLight = new THREE.DirectionalLight(
			0xffffff,
			3
		);
		directionalLight.position.set(1, 1, 1);
		scene.add(light, directionalLight);

		// Camera
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		scene.add(camera);

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.xr.enabled = true;

		// Attach renderer to the div
		if (containerRef.current) {
			containerRef.current.appendChild(renderer.domElement);
		}

		// Add AR Button
		document.body.appendChild(ARButton.createButton(renderer));

		// Load GLTF Model
		const loader = new GLTFLoader();
		loader.load(
			'/models/axe.glb',
			(gltf) => {
				axeModel = gltf.scene;
				axeModel.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
				axeModel.position.set(0, 0, -1); // Position in front of the camera
				scene.add(axeModel);
			},
			undefined,
			(error) => {
				console.error('Error loading GLTF model:', error);
			}
		);

		// Load Font for Text
		const fontLoader = new FontLoader();
		fontLoader.load(
			'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
			(font) => {
				// Title Text
				const textGeometry = new TextGeometry(
					'Ancient Battle Axe',
					{
						font: font,
						size: 0.1,
						height: 0.02,
					}
				);

				const textMaterial = new THREE.MeshStandardMaterial({
					color: 0xffffff,
				});
				textMesh = new THREE.Mesh(textGeometry, textMaterial);
				textMesh.position.set(-0.3, 0.3, -1); // Position near the model
				scene.add(textMesh);

				// Description Text
				const descriptionGeometry = new TextGeometry(
					'Used in ancient warfare and hunting,\ncrafted from iron and wood.',
					{
						font: font,
						size: 0.05, // Smaller text size
						height: 0.01,
					}
				);

				descriptionMesh = new THREE.Mesh(
					descriptionGeometry,
					textMaterial
				);
				descriptionMesh.position.set(-0.35, 0.2, -1); // Slightly lower than title
				scene.add(descriptionMesh);
			}
		);

		// AR Controller for interaction
		const controller = renderer.xr.getController(0);
		scene.add(controller);

		controller.addEventListener('selectstart', () => {
			if (axeModel) {
				axeModel.rotation.y += Math.PI / 4; // Rotate axe when tapped
			}
		});

		// Animation Loop
		renderer.setAnimationLoop(() => {
			if (axeModel) {
				axeModel.rotation.y += 0.01; // Continuous rotation
			}
			renderer.render(scene, camera);
		});

		// Handle window resizing
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};

		window.addEventListener('resize', handleResize);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.setAnimationLoop(null);
			if (containerRef.current) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="bg-black w-[100vw] h-[100vh]"
		/>
	);
};

export default ARViewer;
