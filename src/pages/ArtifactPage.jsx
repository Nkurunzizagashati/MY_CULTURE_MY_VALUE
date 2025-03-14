import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ArtifactPage = () => {
	const [isEnglish, setIsEnglish] = useState(true);

	const toggleLanguage = () => {
		setIsEnglish(!isEnglish);
	};

	return (
		<div className="min-h-screen bg-[#2C2C2C] text-white">
			<Navbar />
			<section className="py-28 px-6 max-w-4xl mx-auto bg-[#3A3A3A] shadow-md rounded-lg p-6">
				<img
					src="https://via.placeholder.com/600x400"
					alt="Artifact Name"
					className="w-full h-64 object-cover rounded-lg mb-4"
				/>
				<h1 className="text-3xl font-bold mb-2">
					{isEnglish ? 'Artifact Name' : "Nom de l'artefact"}
				</h1>
				<p className="text-gray-300 mb-4">
					{isEnglish
						? 'This artifact is a historically significant object from the ancient civilization of XYZ. It was used in ceremonial rituals and holds deep cultural value.'
						: "Cet artefact est un objet historiquement significatif de l'ancienne civilisation XYZ. Il était utilisé dans des rituels cérémoniels et possède une grande valeur culturelle."}
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-2">
					{isEnglish
						? 'Origin & History'
						: 'Origine et Histoire'}
				</h2>
				<p className="text-gray-300 mb-4">
					{isEnglish
						? 'Discovered in XYZ region, this artifact dates back to the 12th century. It was commonly found in royal courts and was a symbol of power and prestige.'
						: 'Découvert dans la région XYZ, cet artefact remonte au 12ème siècle. Il était couramment trouvé dans les cours royales et était un symbole de pouvoir et de prestige.'}
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-2">
					{isEnglish
						? 'Materials & Construction'
						: 'Matériaux et Fabrication'}
				</h2>
				<p className="text-gray-300 mb-4">
					{isEnglish
						? 'Made from finely carved mahogany wood, this artifact showcases detailed craftsmanship with intricate patterns and engravings.'
						: "Fabriqué en bois d'acajou finement sculpté, cet artefact met en valeur un artisanat détaillé avec des motifs et des gravures complexes."}
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-2">
					{isEnglish
						? 'Usage & Importance'
						: 'Utilisation et Importance'}
				</h2>
				<p className="text-gray-300 mb-4">
					{isEnglish
						? 'This artifact was used in ceremonial events to mark special occasions, including royal coronations and religious festivals.'
						: "Cet artefact était utilisé lors d'événements cérémoniels pour marquer des occasions spéciales, y compris les couronnements royaux et les festivals religieux."}
				</p>

				<div className="mt-6 text-center flex justify-center gap-4">
					<button
						onClick={toggleLanguage}
						className="px-4 py-2 bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]"
					>
						{isEnglish
							? 'Translate to French'
							: 'Translate to English'}
					</button>
					<a
						href="/artifacts/ar/123"
						className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
					>
						{isEnglish ? 'View in AR' : 'Voir en AR'}
					</a>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ArtifactPage;
