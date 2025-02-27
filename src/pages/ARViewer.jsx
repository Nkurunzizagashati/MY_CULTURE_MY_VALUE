import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Navbar from '../components/Navbar';

const ARViewer = () => {
	const containerRef = useRef(null);
	const location = useLocation();

	const params = new URLSearchParams(location.search);
	const modelUrl = params.get('model') || '/models/default.glb';
	const description =
		params.get('description') || 'An ancient artifact.';

	let artifactModel = null;
	let isDragging = false;
	let previousMousePosition = { x: 0, y: 0 };

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
		camera.position.set(0, 1.5, 2);
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
			(error) => console.error('Error loading GLTF model:', error)
		);

		function onMouseDown(event) {
			isDragging = true;
			previousMousePosition = {
				x: event.clientX,
				y: event.clientY,
			};
		}

		function onMouseUp() {
			isDragging = false;
		}

		function onMouseMove(event) {
			if (!isDragging || !artifactModel) return;

			const deltaX = event.clientX - previousMousePosition.x;
			const deltaY = event.clientY - previousMousePosition.y;

			artifactModel.rotation.y += deltaX * 0.01;
			artifactModel.rotation.x += deltaY * 0.01;

			previousMousePosition = {
				x: event.clientX,
				y: event.clientY,
			};
		}

		function onWheel(event) {
			if (artifactModel) {
				const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
				artifactModel.scale.multiplyScalar(scaleFactor);
			}
		}

		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});

		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('wheel', onWheel);

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('mousedown', onMouseDown);
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('resize', handleResize);
			renderer.setAnimationLoop(null);
			if (containerRef.current) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, [modelUrl]);

	return (
		<div>
			<Navbar />
			<div
				ref={containerRef}
				className="bg-[#2C2C2C] w-[100vw] h-[100vh] relative"
			>
				{/* Centered horizontally and starts from top vertically */}
				<div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 pointer-events-none">
					<section className="bg-white text-center p-6 rounded-2xl shadow-lg max-w-md">
						<h2 className="text-2xl font-bold text-black mb-4">
							Artifact Description
						</h2>
						<p className="text-lg text-gray-700 font-semibold">
							{description}
						</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default ARViewer;
