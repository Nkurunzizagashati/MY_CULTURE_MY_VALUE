import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtifacts } from '../redux/artifactSlice';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ArtifactsPage = () => {
	const dispatch = useDispatch();

	const { items: artifacts, status } = useSelector(
		(state) => state.artifacts
	);

	useEffect(() => {
		dispatch(fetchArtifacts());
	}, [dispatch]);

	return (
		<div>
			<Navbar />
			<section className="py-28 px-6 min-h-[100vh] bg-[#2C2C2C]">
				<h2 className="text-3xl font-bold text-center mb-8 text-white">
					Cultural Artifacts
				</h2>

				{status === 'loading' && (
					<p className="text-center">Loading...</p>
				)}
				{status === 'failed' && (
					<p className="text-center text-red-500">
						Failed to load artifacts
					</p>
				)}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{artifacts.map((artifact) => (
						<div
							key={artifact._id}
							className="p-4 border rounded-lg shadow-md hover:shadow-xl bg-white flex flex-col justify-between"
						>
							<div>
								<img
									src={artifact.image}
									alt={artifact.title_en}
									className="h-40 w-full object-cover rounded-lg mb-4"
								/>
								<h4 className="text-xl font-semibold">
									Name: {artifact?.title_kin} -
									{' ' + artifact.title_en}
								</h4>
								<p className="text-[#4A6781] text-sm">
									Description:{' '}
									{artifact?.description_kin}
								</p>
							</div>
							<div className="flex justify-between mt-4">
								<NavLink
									to={`/artifacts/ar/${
										artifact._id
									}?model=${encodeURIComponent(
										artifact.model3D
									)}&description=${encodeURIComponent(
										artifact.description
									)}`}
									className="px-4 py-2 bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]"
								>
									View in AR
								</NavLink>
								<NavLink
									to={`/artifacts/${artifact._id}`}
									className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
								>
									Learn More
								</NavLink>
							</div>
						</div>
					))}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ArtifactsPage;
