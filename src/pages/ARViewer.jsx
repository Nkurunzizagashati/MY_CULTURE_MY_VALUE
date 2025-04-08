// import { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import * as THREE from 'three';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import Navbar from '../components/Navbar';
// import { Vector3 } from 'three';
// import { Box3 } from 'three';

// const ARViewer = () => {
// 	const containerRef = useRef(null);
// 	const location = useLocation();
// 	const artifactModelRef = useRef(null); // Store model reference

// 	const params = new URLSearchParams(location.search);
// 	let modelUrl = params.get('model') || '/models/default.glb';

// 	// OPTIMIZE THE MODEL
// 	if (modelUrl.includes('res.cloudinary.com')) {
// 		modelUrl = modelUrl.replace(
// 			'/image/upload',
// 			'/image/upload/q_90'
// 		);
// 	}

// 	const description =
// 		params.get('description') || 'An ancient artifact.';

// 	let isDragging = false;
// 	let previousMousePosition = { x: 0, y: 0 };
// 	let initialDistance = null;

// 	useEffect(() => {
// 		// PREVENT PAGE FROM ZOOMING WHEN INTERACTING WITH MODELS

// 		const preventZoom = (event) => {
// 			if (!location.pathname.includes('/arviewer')) return;

// 			// Allow interactions with buttons, navbar, or elements inside sections
// 			if (
// 				event.target.closest('button') ||
// 				document.querySelector('nav')?.contains(event.target) ||
// 				document
// 					.querySelector('section')
// 					?.contains(event.target)
// 			) {
// 				return;
// 			}

// 			// Allow normal scrolling
// 			if (event.type === 'wheel' || event.type === 'touchmove') {
// 				const isScrollable =
// 					event.target.scrollHeight >
// 					event.target.clientHeight;
// 				if (isScrollable) return; // Do not prevent scrolling
// 			}

// 			// Only prevent zooming (gesture-based zoom)
// 			if (
// 				event.type === 'gesturestart' ||
// 				(event.ctrlKey && event.type === 'wheel')
// 			) {
// 				event.preventDefault();
// 			}
// 		};

// 		document.addEventListener('wheel', preventZoom, {
// 			passive: false,
// 		});
// 		document.addEventListener('touchstart', preventZoom, {
// 			passive: false,
// 		});
// 		document.addEventListener('gesturestart', preventZoom);

// 		// =======================================================
// 		const scene = new THREE.Scene();
// 		const light = new THREE.AmbientLight(0xffffff, 1.5);
// 		const directionalLight = new THREE.DirectionalLight(
// 			0xffffff,
// 			3
// 		);
// 		directionalLight.position.set(1, 1, 1);
// 		scene.add(light, directionalLight);

// 		const camera = new THREE.PerspectiveCamera(
// 			75,
// 			window.innerWidth / window.innerHeight,
// 			0.1,
// 			1000
// 		);
// 		camera.position.set(0, 1.5, 2);
// 		scene.add(camera);

// 		const renderer = new THREE.WebGLRenderer({
// 			antialias: true,
// 			alpha: true,
// 		});
// 		renderer.setSize(window.innerWidth, window.innerHeight);
// 		renderer.setPixelRatio(window.devicePixelRatio);
// 		renderer.xr.enabled = true;

// 		if (containerRef.current) {
// 			containerRef.current.appendChild(renderer.domElement);
// 		}

// 		// ✅ Store AR button reference and append it to body
// 		const arButton = ARButton.createButton(renderer);
// 		document.body.appendChild(arButton);
// 		arButton.style.pointerEvents = 'auto';

// 		const loader = new GLTFLoader();
// 		loader.load(
// 			modelUrl,
// 			(gltf) => {
// 				artifactModelRef.current = gltf.scene;
// 				artifactModelRef.current.scale.set(0.5, 0.5, 0.5);
// 				artifactModelRef.current.position.set(0, 0, -1);
// 				scene.add(artifactModelRef.current);

// 				// ✅ AUTO-FOCUS CAMERA ON MODEL
// 				const box = new Box3().setFromObject(
// 					artifactModelRef.current
// 				);
// 				const center = new Vector3();
// 				box.getCenter(center);

// 				// Adjust camera to frame the model
// 				const size = box.getSize(new Vector3()).length();
// 				const distance = size * 1.5; // Adjust multiplier as needed
// 				const direction = new Vector3()
// 					.subVectors(camera.position, center)
// 					.normalize();

// 				// Move camera dynamically
// 				camera.position.copy(
// 					center.clone().addScaledVector(direction, distance)
// 				);
// 				camera.lookAt(center);
// 			},
// 			undefined,
// 			(error) => console.error('Error loading GLTF model:', error)
// 		);

// 		// Mouse interactions
// 		function onMouseDown(event) {
// 			isDragging = true;
// 			previousMousePosition = {
// 				x: event.clientX,
// 				y: event.clientY,
// 			};
// 		}

// 		function onMouseUp() {
// 			isDragging = false;
// 		}

// 		function onMouseMove(event) {
// 			if (!isDragging || !artifactModelRef.current) return;

// 			const deltaX = event.clientX - previousMousePosition.x;
// 			const deltaY = event.clientY - previousMousePosition.y;

// 			artifactModelRef.current.rotation.y += deltaX * 0.01;
// 			artifactModelRef.current.rotation.x += deltaY * 0.01;

// 			previousMousePosition = {
// 				x: event.clientX,
// 				y: event.clientY,
// 			};
// 		}

// 		function onWheel(event) {
// 			if (artifactModelRef.current) {
// 				const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
// 				artifactModelRef.current.scale.multiplyScalar(
// 					scaleFactor
// 				);
// 			}
// 		}

// 		// Touch interactions
// 		function onTouchStart(event) {
// 			if (event.touches.length === 1) {
// 				isDragging = true;
// 				previousMousePosition = {
// 					x: event.touches[0].clientX,
// 					y: event.touches[0].clientY,
// 				};
// 			} else if (event.touches.length === 2) {
// 				initialDistance = getTouchDistance(event);
// 			}
// 		}

// 		function onTouchMove(event) {
// 			if (
// 				event.touches.length === 1 &&
// 				isDragging &&
// 				artifactModelRef.current
// 			) {
// 				const deltaX =
// 					event.touches[0].clientX - previousMousePosition.x;
// 				const deltaY =
// 					event.touches[0].clientY - previousMousePosition.y;

// 				artifactModelRef.current.rotation.y += deltaX * 0.01;
// 				artifactModelRef.current.rotation.x += deltaY * 0.01;

// 				previousMousePosition = {
// 					x: event.touches[0].clientX,
// 					y: event.touches[0].clientY,
// 				};
// 			} else if (
// 				event.touches.length === 2 &&
// 				artifactModelRef.current
// 			) {
// 				const newDistance = getTouchDistance(event);
// 				if (initialDistance) {
// 					const scaleFactor =
// 						newDistance > initialDistance ? 1.05 : 0.95;
// 					artifactModelRef.current.scale.multiplyScalar(
// 						scaleFactor
// 					);
// 				}
// 				initialDistance = newDistance;
// 			}
// 		}

// 		function onTouchEnd() {
// 			isDragging = false;
// 			initialDistance = null;
// 		}

// 		function getTouchDistance(event) {
// 			const dx =
// 				event.touches[0].clientX - event.touches[1].clientX;
// 			const dy =
// 				event.touches[0].clientY - event.touches[1].clientY;
// 			return Math.sqrt(dx * dx + dy * dy);
// 		}

// 		renderer.setAnimationLoop(() => {
// 			renderer.render(scene, camera);
// 		});

// 		window.addEventListener('mousedown', onMouseDown);
// 		window.addEventListener('mouseup', onMouseUp);
// 		window.addEventListener('mousemove', onMouseMove);
// 		window.addEventListener('wheel', onWheel);

// 		window.addEventListener('touchstart', onTouchStart);
// 		window.addEventListener('touchmove', onTouchMove);
// 		window.addEventListener('touchend', onTouchEnd);

// 		const handleResize = () => {
// 			camera.aspect = window.innerWidth / window.innerHeight;
// 			camera.updateProjectionMatrix();
// 			renderer.setSize(window.innerWidth, window.innerHeight);
// 		};
// 		window.addEventListener('resize', handleResize);

// 		// ✅ Cleanup function to remove the AR button when leaving the page
// 		return () => {
// 			window.removeEventListener('mousedown', onMouseDown);
// 			window.removeEventListener('mouseup', onMouseUp);
// 			window.removeEventListener('mousemove', onMouseMove);
// 			window.removeEventListener('wheel', onWheel);

// 			window.removeEventListener('touchstart', onTouchStart);
// 			window.removeEventListener('touchmove', onTouchMove);
// 			window.removeEventListener('touchend', onTouchEnd);

// 			window.removeEventListener('resize', handleResize);
// 			renderer.setAnimationLoop(null);

// 			if (containerRef.current) {
// 				containerRef.current.removeChild(renderer.domElement);
// 			}

// 			if (arButton && arButton.parentNode) {
// 				arButton.parentNode.removeChild(arButton);
// 			}

// 			// PREVENT PAGE FROM ZOOMING WHEN INTERACTING WITH MODELS
// 			document.removeEventListener('wheel', preventZoom);
// 			document.removeEventListener('touchstart', preventZoom);
// 			document.removeEventListener('gesturestart', preventZoom);

// 			// =======================================================
// 		};
// 	}, [modelUrl]);

// 	return (
// 		<div className="ar-viewer">
// 			<Navbar />
// 			<div
// 				ref={containerRef}
// 				className="bg-[#2C2C2C] w-[100vw] h-[100vh] relative"
// 			>
// 				{/* Centered horizontally and starts from top vertically */}
// 				<div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 pointer-events-none">
// 					<section className="bg-white text-center p-6 rounded-2xl shadow-lg max-w-md hidden sm:block">
// 						<h2 className="text-2xl font-bold text-black mb-4">
// 							Artifact Description
// 						</h2>
// 						<p className="text-lg text-gray-700 font-semibold">
// 							{description}
// 						</p>
// 					</section>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ARViewer;

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Navbar from '../components/Navbar';
import { Vector3 } from 'three';
import { Box3 } from 'three';

const ARViewer = () => {
	const containerRef = useRef(null);
	const location = useLocation();
	const artifactModelRef = useRef(null); // Store model reference

	const params = new URLSearchParams(location.search);
	let modelUrl = params.get('model') || '/models/default.glb';

	// OPTIMIZE THE MODEL
	if (modelUrl.includes('res.cloudinary.com')) {
		modelUrl = modelUrl.replace(
			'/image/upload',
			'/image/upload/q_90'
		);
	}

	let isDragging = false;
	let previousMousePosition = { x: 0, y: 0 };
	let initialDistance = null;

	useEffect(() => {
		// PREVENT PAGE FROM ZOOMING WHEN INTERACTING WITH MODELS

		const preventZoom = (event) => {
			if (!location.pathname.includes('/arviewer')) return;

			// Allow interactions with buttons, navbar, or elements inside sections
			if (
				event.target.closest('button') ||
				document.querySelector('nav')?.contains(event.target) ||
				document
					.querySelector('section')
					?.contains(event.target)
			) {
				return;
			}

			// Allow normal scrolling
			if (event.type === 'wheel' || event.type === 'touchmove') {
				const isScrollable =
					event.target.scrollHeight >
					event.target.clientHeight;
				if (isScrollable) return; // Do not prevent scrolling
			}

			// Only prevent zooming (gesture-based zoom)
			if (
				event.type === 'gesturestart' ||
				(event.ctrlKey && event.type === 'wheel')
			) {
				event.preventDefault();
			}
		};

		document.addEventListener('wheel', preventZoom, {
			passive: false,
		});
		document.addEventListener('touchstart', preventZoom, {
			passive: false,
		});
		document.addEventListener('gesturestart', preventZoom);

		// =======================================================
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

		// HIT TESTING
		let hitTestSource = null;
		let hitTestSourceRequested = false;
		const referenceSpace = renderer.xr.getReferenceSpace();

		if (containerRef.current) {
			containerRef.current.appendChild(renderer.domElement);
		}

		// ✅ Store AR button reference and append it to body
		const arButton = ARButton.createButton(renderer);
		document.body.appendChild(arButton);
		arButton.style.pointerEvents = 'auto';

		const loader = new GLTFLoader();
		loader.load(
			modelUrl,
			(gltf) => {
				artifactModelRef.current = gltf.scene;
				artifactModelRef.current.scale.set(0.5, 0.5, 0.5);
				artifactModelRef.current.position.set(0, 0, -1);
				scene.add(artifactModelRef.current);

				// ✅ AUTO-FOCUS CAMERA ON MODEL
				const box = new Box3().setFromObject(
					artifactModelRef.current
				);
				const center = new Vector3();
				box.getCenter(center);

				// Adjust camera to frame the model
				const size = box.getSize(new Vector3()).length();
				const distance = size * 1.5; // Adjust multiplier as needed
				const direction = new Vector3()
					.subVectors(camera.position, center)
					.normalize();

				// Move camera dynamically
				camera.position.copy(
					center.clone().addScaledVector(direction, distance)
				);
				camera.lookAt(center);
			},
			undefined,
			(error) => console.error('Error loading GLTF model:', error)
		);

		// Mouse interactions
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
			if (!isDragging || !artifactModelRef.current) return;

			const deltaX = event.clientX - previousMousePosition.x;
			const deltaY = event.clientY - previousMousePosition.y;

			artifactModelRef.current.rotation.y += deltaX * 0.01;
			artifactModelRef.current.rotation.x += deltaY * 0.01;

			previousMousePosition = {
				x: event.clientX,
				y: event.clientY,
			};
		}

		function onWheel(event) {
			if (artifactModelRef.current) {
				const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
				artifactModelRef.current.scale.multiplyScalar(
					scaleFactor
				);
			}
		}

		// Touch interactions
		function onTouchStart(event) {
			if (event.touches.length === 1) {
				isDragging = true;
				previousMousePosition = {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY,
				};
			} else if (event.touches.length === 2) {
				initialDistance = getTouchDistance(event);
			}
		}

		function onTouchMove(event) {
			if (
				event.touches.length === 1 &&
				isDragging &&
				artifactModelRef.current
			) {
				const deltaX =
					event.touches[0].clientX - previousMousePosition.x;
				const deltaY =
					event.touches[0].clientY - previousMousePosition.y;

				artifactModelRef.current.rotation.y += deltaX * 0.01;
				artifactModelRef.current.rotation.x += deltaY * 0.01;

				previousMousePosition = {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY,
				};
			} else if (
				event.touches.length === 2 &&
				artifactModelRef.current
			) {
				const newDistance = getTouchDistance(event);
				if (initialDistance) {
					const scaleFactor =
						newDistance > initialDistance ? 1.05 : 0.95;
					artifactModelRef.current.scale.multiplyScalar(
						scaleFactor
					);
				}
				initialDistance = newDistance;
			}
		}

		function onTouchEnd() {
			isDragging = false;
			initialDistance = null;
		}

		function getTouchDistance(event) {
			const dx =
				event.touches[0].clientX - event.touches[1].clientX;
			const dy =
				event.touches[0].clientY - event.touches[1].clientY;
			return Math.sqrt(dx * dx + dy * dy);
		}

		// ENABLE HIT TESTING

		const setupHitTest = async () => {
			const session = renderer.xr.getSession();
			if (session && !hitTestSourceRequested) {
				const space = await session.requestReferenceSpace(
					'viewer'
				);
				hitTestSource = await session.requestHitTestSource({
					space,
				});
				hitTestSourceRequested = true;
			}
		};

		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);

			// ENABLE HIT TESTING

			if (!hitTestSourceRequested) {
				setupHitTest();
			}

			if (hitTestSource) {
				const frame = renderer.xr.getFrame();
				if (frame) {
					const hitTestResults =
						frame.getHitTestResults(hitTestSource);
					if (hitTestResults.length > 0) {
						const hit = hitTestResults[0];
						const pose = hit.getPose(referenceSpace);
						if (artifactModelRef.current) {
							artifactModelRef.current.position.set(
								pose.transform.position.x,
								pose.transform.position.y,
								pose.transform.position.z
							);
							artifactModelRef.current.visible = true;
						}
					}
				}
			}
		});

		// ENABLE HIT TESTING
		const onSelect = () => {
			if (artifactModelRef.current) {
				artifactModelRef.current.position.set(
					artifactModelRef.current.position.x,
					artifactModelRef.current.position.y,
					artifactModelRef.current.position.z
				);
			}
		};

		const controller = renderer.xr.getController(0);
		controller.addEventListener('select', onSelect);
		scene.add(controller);

		// ================================================

		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('wheel', onWheel);

		window.addEventListener('touchstart', onTouchStart);
		window.addEventListener('touchmove', onTouchMove);
		window.addEventListener('touchend', onTouchEnd);

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', handleResize);

		// ✅ Cleanup function to remove the AR button when leaving the page
		return () => {
			window.removeEventListener('mousedown', onMouseDown);
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('wheel', onWheel);

			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);

			window.removeEventListener('resize', handleResize);
			renderer.setAnimationLoop(null);

			if (containerRef.current) {
				containerRef.current.removeChild(renderer.domElement);
			}

			if (arButton && arButton.parentNode) {
				arButton.parentNode.removeChild(arButton);
			}

			// PREVENT PAGE FROM ZOOMING WHEN INTERACTING WITH MODELS
			document.removeEventListener('wheel', preventZoom);
			document.removeEventListener('touchstart', preventZoom);
			document.removeEventListener('gesturestart', preventZoom);

			// =======================================================
		};
	}, [modelUrl]);

	return (
		<div className="ar-viewer">
			<Navbar />
			<div
				ref={containerRef}
				className="bg-[#2C2C2C] w-[100vw] h-[100vh] relative"
			></div>
		</div>
	);
};

export default ARViewer;
