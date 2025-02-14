import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtifacts } from '../redux/artifactSlice';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ArtifactsPage = () => {
	const dispatch = useDispatch();

	// Get artifacts from Redux state
	const { items: artifacts, status } = useSelector(
		(state) => state.artifacts
	);

	// Fetch artifacts when the component mounts
	useEffect(() => {
		dispatch(fetchArtifacts());
	}, [dispatch]);

	return (
		<div>
			<Navbar />
			<section className="py-28 px-6 min-h-[100vh]">
				<h2 className="text-3xl font-bold text-center mb-8">
					Cultural Artifacts
				</h2>

				{/* Loading & Error States */}
				{status === 'loading' && (
					<p className="text-center">Loading...</p>
				)}
				{status === 'failed' && (
					<p className="text-center text-red-500">
						Failed to load artifacts
					</p>
				)}

				{/* Artifacts Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{artifacts.map((artifact) => (
						<div
							key={artifact._id}
							className="p-4 border rounded-lg shadow-md hover:shadow-xl bg-white"
						>
							<img
								src={artifact.image}
								alt={artifact.name}
								className="h-40 w-full object-cover rounded-lg mb-4"
							/>
							<h4 className="text-xl font-semibold">
								{artifact.name}
							</h4>
							<p className="text-[#4A6781] text-sm">
								{artifact.description}
							</p>
							<NavLink
								to={`/artifacts/ar/${
									artifact._id
								}?model=${encodeURIComponent(
									artifact.model3D
								)}&description=${encodeURIComponent(
									artifact.description
								)}`}
								className="mt-4 px-4 py-2 inline-block bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]"
							>
								View in AR
							</NavLink>
						</div>
					))}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ArtifactsPage;
