import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
	return (
		<div className="min-h-screen bg-[#2C2C2C] text-white transition-colors duration-500">
			<Navbar />
			<main className="p-10 max-w-5xl mx-auto">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Terms and Conditions
				</h1>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mt-4">
						1. Terms of Use
					</h2>
					<p className="mt-2">
						By accessing and using the MCMV platform, you
						agree to abide by the following terms and
						conditions. These terms govern your access to
						and use of the services provided, including
						viewing cultural artifacts, using AR technology,
						and interacting with educational content.
					</p>
					<ul className="list-disc list-inside ml-4 mt-2">
						<li>
							You must be 13 years or older to use the
							platform.
						</li>
						<li>
							Use of the platform is strictly for
							educational and non-commercial purposes.
						</li>
						<li>
							Respect the cultural significance of the
							content and refrain from duplicating,
							redistributing, or altering content without
							permission.
						</li>
						<li>
							Accounts may be terminated if users violate
							these terms.
						</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mt-4">
						2. Privacy Policy
					</h2>
					<p className="mt-2">
						We respect your privacy and are committed to
						protecting your personal data. We collect
						minimal information such as name, email, and
						login details to ensure a personalized and
						secure experience.
					</p>
					<ul className="list-disc list-inside ml-4 mt-2">
						<li>
							No personal data is sold or shared with
							third parties.
						</li>
						<li>
							User interaction data is collected
							anonymously for analytics and improvement.
						</li>
						<li>
							All passwords are encrypted and stored
							securely.
						</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mt-4">
						3. Security Practices
					</h2>
					<p className="mt-2">
						We implement strong security practices to
						protect our users and their data:
					</p>
					<ul className="list-disc list-inside ml-4 mt-2">
						<li>Encrypted communication using HTTPS.</li>
						<li>JWT-based secure session management.</li>
						<li>
							Regular updates, patching, and code audits.
						</li>
						<li>
							Role-based access control for all sensitive
							features.
						</li>
					</ul>
				</section>

				<section className="mb-8">
					<h2 className="text-2xl font-semibold mt-4">
						4. Ethical and Cultural Considerations
					</h2>
					<p className="mt-2">
						MCMV is built on the principles of Ubuntu,
						community respect, and cultural preservation. We
						work with cultural experts and communities to
						ensure accurate, respectful representation.
					</p>
					<ul className="list-disc list-inside ml-4 mt-2">
						<li>
							We avoid harmful stereotypes and promote
							positive cultural narratives.
						</li>
						<li>
							Content is reviewed with guidance from
							traditional and academic experts.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-4">
						5. Contact and Updates
					</h2>
					<p className="mt-2">
						If you have any questions or concerns about our
						policies, contact us at{' '}
						<a
							href="mailto:support@mcmv.rw"
							className="text-blue-400 underline"
						>
							support@mcmv.rw
						</a>
						. We may update these terms and policies to
						reflect platform changes or legal updates.
					</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default TermsAndConditions;
