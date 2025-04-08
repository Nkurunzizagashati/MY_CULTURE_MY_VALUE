import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ArtifactsPage = () => {
	const { items: artifacts, status } = useSelector(
		(state) => state.artifacts
	);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterCategory, setFilterCategory] = useState('');

	// Filter artifacts based on search input and category
	const filteredArtifacts = artifacts.filter((artifact) => {
		const matchesSearch =
			artifact.title_en
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			artifact.title_kin
				?.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			artifact.name
				?.toLowerCase()
				.includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory
			? artifact.description_en?.includes(filterCategory) ||
			  artifact.usage_en.includes(filterCategory)
			: true;

		return matchesSearch && matchesCategory;
	});

	return (
		<div className="artifacts">
			<Navbar />
			<section className="py-28 px-6 min-h-[100vh] bg-[#2C2C2C]">
				<h2 className="text-3xl font-bold text-center mb-8 text-white">
					Cultural Artifacts
				</h2>

				{/* Search & Filter Fields */}
				<div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row gap-4">
					<input
						type="text"
						placeholder="Search by name..."
						className="p-3 w-full md:w-2/3 rounded-lg border border-gray-300"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<select
						className="p-3 w-full md:w-1/3 rounded-lg border border-gray-300"
						value={filterCategory}
						onChange={(e) =>
							setFilterCategory(e.target.value)
						}
					>
						<option value="">All Categories</option>
						<option value="art">Art</option>
						<option value="army">Army</option>
						<option value="entertainment">
							Music & Entertainment
						</option>
						<option value="agriculture">Agriculture</option>
					</select>
				</div>

				{status === 'loading' && (
					<p className="text-center text-white">Loading...</p>
				)}
				{status === 'failed' && (
					<p className="text-center text-red-500">
						Failed to load artifacts
					</p>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{filteredArtifacts.length > 0 ? (
						filteredArtifacts.map((artifact) => (
							<div
								key={artifact._id}
								className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl bg-gray-100 flex flex-col justify-between"
							>
								<div>
									<img
										src={
											artifact.image.includes(
												'res.cloudinary.com'
											)
												? `https://res.cloudinary.com/dhuwnnvuj/image/upload/w_600,q_auto,f_auto/${
														artifact.image.split(
															'image/upload/'
														)[1]
												  }`
												: `https://res.cloudinary.com/dhuwnnvuj/image/upload/w_600,q_auto,f_auto/${artifact.image}`
										}
										alt={artifact.title_en}
										className="h-40 w-full object-cover rounded-lg mb-4"
									/>
									<h4 className="text-xl font-semibold text-gray-900">
										Name: {artifact?.title_kin} -{' '}
										{artifact.title_en}
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
										className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500"
									>
										Learn More
									</NavLink>
								</div>
							</div>
						))
					) : (
						<p className="text-center text-white">
							No artifacts found
						</p>
					)}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ArtifactsPage;
