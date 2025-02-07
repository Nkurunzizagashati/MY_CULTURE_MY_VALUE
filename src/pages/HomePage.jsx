import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HomePage = () => {
	return (
		<div className="bg-[#F5E6CC] min-h-screen text-[#2E4D36]">
			<Navbar />

			<section className="text-center py-20 px-6">
				<h2 className="text-4xl font-bold mb-4">
					Preserving Rwanda’s Cultural Heritage
				</h2>
				<p className="text-lg text-[#4A6781] max-w-2xl mx-auto">
					Explore, interact, and learn about Rwanda’s rich
					history through Augmented Reality.
				</p>
				<button className="mt-6 px-6 py-3 bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]">
					Explore Artifacts
				</button>
			</section>

			{/* Featured Artifacts */}
			<section id="artifacts" className="py-16 px-6 bg-white">
				<h3 className="text-3xl font-bold text-center mb-8">
					Featured Artifacts
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{[1, 2, 3].map((artifact) => (
						<div
							key={artifact}
							className="p-4 border rounded-lg shadow-md hover:shadow-xl"
						>
							<div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
							<h4 className="text-xl font-semibold">
								Artifact {artifact}
							</h4>
							<p className="text-[#4A6781] text-sm">
								Brief description of the artifact.
							</p>
						</div>
					))}
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-16 px-6">
				<h3 className="text-3xl font-bold text-center mb-4">
					About the Project
				</h3>
				<p className="text-lg text-center text-[#4A6781] max-w-3xl mx-auto">
					This project is dedicated to digitally preserving
					Rwanda’s traditional artifacts, allowing users to
					view them in 3D and interact using AR technology.
				</p>
			</section>

			<Footer />
		</div>
	);
};

export default HomePage;
