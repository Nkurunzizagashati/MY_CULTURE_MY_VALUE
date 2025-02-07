import { useParams } from 'react-router-dom';

const ARViewer = () => {
	const { id } = useParams();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#F5E6CC] text-[#2E4D36]">
			<h1 className="text-3xl font-bold mb-6">
				View Artifact in AR
			</h1>
			<model-viewer
				src={`/models/artifact-${id}.glb`}
				ar
				ar-modes="webxr scene-viewer quick-look"
				camera-controls
				auto-rotate
				className="w-[80%] h-[500px] bg-white shadow-lg rounded-lg"
			></model-viewer>
			<button
				onClick={() => window.history.back()}
				className="mt-6 px-6 py-2 bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]"
			>
				Go Back
			</button>
		</div>
	);
};

export default ARViewer;
