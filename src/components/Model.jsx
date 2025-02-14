import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Model = () => {
	const modalRef = useRef();
	useFrame((state, delta) => {
		modalRef.current.rotation.y += delta;
	});
	return (
		<>
			<OrbitControls />
			<ambientLight />
			<mesh ref={modalRef}>
				<boxGeometry args={[2, 2, 2]} />
				<meshStandardMaterial color="red" />
			</mesh>
		</>
	);
};

export default Model;
