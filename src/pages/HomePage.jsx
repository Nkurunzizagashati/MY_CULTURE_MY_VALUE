import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const images = ['/Igisabo.jpg', '/intore.jpg', '/gucunda.jpg'];

const HomePage = () => {
	const artifacts = useSelector((state) => state.artifacts.items);
	const [currentImage, setCurrentImage] = useState(0);

	// Change image every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % images.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative min-h-screen text-[#2E4D36]">
			{/* Fixed Navbar */}
			<div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
				<Navbar />
			</div>

			{/* Image Slider as Background */}
			<div className="absolute inset-0 w-full h-[68vh] overflow-hidden">
				<img
					src={images[currentImage]}
					alt="Rwandan Culture"
					className="w-full h-full object-cover transition-opacity duration-1000"
				/>
			</div>

			{/* Content Wrapper Above Background */}
			<div className="relative z-10 pt-[70px] bg-white bg-opacity-40">
				<section className="text-center py-20 px-6">
					<h2 className="text-4xl font-bold text-black mb-4">
						Preserving Rwanda’s Cultural Heritage
					</h2>
					<p className="text-lg text-black font-bold max-w-2xl mx-auto">
						Explore, interact, and learn about Rwanda’s rich
						history through Augmented Reality.
					</p>
					<button className="mt-6 px-6 py-3 bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]">
						Explore Artifacts
					</button>
				</section>

				{/* Featured Artifacts */}
				<section id="artifacts" className="py-16 px-6">
					<h3 className="text-3xl font-bold text-center mb-8">
						Featured Artifacts
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
						{artifacts.length > 0 ? (
							artifacts.map((artifact) => (
								<div
									key={artifact.id}
									className="p-4 border rounded-lg shadow-md hover:shadow-xl"
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
								</div>
							))
						) : (
							<p className="text-center text-gray-500">
								No artifacts available
							</p>
						)}
					</div>
				</section>

				{/* About Section */}
				<section id="about" className="py-16 px-6">
					<h3 className="text-3xl font-bold text-center mb-4">
						About the Project
					</h3>
					<p className="text-lg text-center text-[#4A6781] max-w-3xl mx-auto">
						This project is dedicated to digitally
						preserving Rwanda’s traditional artifacts,
						allowing users to view them in 3D and interact
						using AR technology.
					</p>
				</section>

				<Footer />
			</div>
		</div>
	);
};

export default HomePage;
