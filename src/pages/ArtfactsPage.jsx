import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ArtfactsPage = () => {
	return (
		<div>
			<Navbar />
			<section className="py-16 px-6">
				<h2 className="text-3xl font-bold text-center mb-8">
					Cultural Artifacts
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{[1, 2, 3, 4, 5, 6].map((artifact) => (
						<div
							key={artifact}
							className="p-4 border rounded-lg shadow-md hover:shadow-xl bg-white"
						>
							<div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
							<h4 className="text-xl font-semibold">
								Artifact {artifact}
							</h4>
							<p className="text-[#4A6781] text-sm">
								Detailed description of the artifact,
								its significance, and history.
							</p>
							<button className="mt-4 px-4 py-2 bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]">
								View in AR
							</button>
						</div>
					))}
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default ArtfactsPage;
