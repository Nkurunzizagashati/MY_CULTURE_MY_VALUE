// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchArtifacts, addArtifact } from '../redux/artifactSlice';
// import Card from '../customComponents/Card';
// import { FileText, Trash, Download, Package } from 'lucide-react';
// import Navbar from '../components/Navbar';

// export default function UploadsPage() {
// 	const dispatch = useDispatch();

// 	const { items: artifacts, status } = useSelector(
// 		(state) => state.artifacts
// 	);

// 	console.log(`ARTIFACTS: ${artifacts}`);

// 	const [formData, setFormData] = useState({
// 		title: '',
// 		description: '',
// 		image: null,
// 		model3D: null,
// 	});

// 	useEffect(() => {
// 		dispatch(fetchArtifacts());
// 	}, [dispatch]);

// 	// Handle text input changes
// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	// Handle file input changes
// 	const handleFileChange = (e) => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.files[0],
// 		});
// 	};

// 	// Handle form submission
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const data = new FormData();
// 		data.append('name', formData.title);
// 		data.append('description', formData.description);
// 		data.append('image', formData.image);
// 		data.append('model3D', formData.model3D);
// 		dispatch(addArtifact(data));
// 	};

// 	return (
// 		<div>
// 			<Navbar />
// 			<div className="p-6 bg-[#2C2C2C]">
// 				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
// 					Artifact Uploads
// 				</h2>

// 				<Card title="Upload New Artifact ">
// 					<form
// 						onSubmit={handleSubmit}
// 						className="space-y-4 "
// 					>
// 						<input
// 							type="text"
// 							name="title"
// 							placeholder="Title"
// 							className="w-full p-2 border rounded"
// 							onChange={handleChange}
// 						/>
// 						<textarea
// 							name="description"
// 							placeholder="Description"
// 							className="w-full p-2 border rounded"
// 							onChange={handleChange}
// 						></textarea>
// 						<input
// 							type="file"
// 							name="image"
// 							accept="image/*"
// 							className="w-full p-2 border rounded"
// 							onChange={handleFileChange}
// 						/>
// 						<input
// 							type="file"
// 							name="model3D"
// 							accept=".obj,.glb,.stl"
// 							className="w-full p-2 border rounded"
// 							onChange={handleFileChange}
// 						/>
// 						<button
// 							type="submit"
// 							className="bg-blue-600 text-white px-4 py-2 rounded"
// 						>
// 							Upload Artifact
// 						</button>
// 					</form>
// 				</Card>

// 				{/* Uploaded Artifacts */}
// 				<Card title="Uploaded Artifacts">
// 					{status === 'loading' ? (
// 						<p>Loading...</p>
// 					) : status === 'failed' ? (
// 						<p>Error loading artifacts</p>
// 					) : (
// 						<table className="w-full text-left border-collapse">
// 							<thead>
// 								<tr className="border-b">
// 									<th className="p-3">Image</th>
// 									<th className="p-3">Title</th>
// 									<th className="p-3">Description</th>
// 									<th className="p-3">3D Model</th>
// 									<th className="p-3">Upload Date</th>
// 									<th className="p-3">Actions</th>
// 								</tr>
// 							</thead>
// 							<tbody>
// 								{artifacts?.map((artifact) => (
// 									<tr
// 										key={artifact._id}
// 										className="border-b"
// 									>
// 										<td className="p-3">
// 											<img
// 												src={artifact.image}
// 												alt={artifact.name}
// 												className="h-10 w-10 object-cover rounded"
// 											/>
// 										</td>
// 										<td className="p-3">
// 											{artifact.name}
// 										</td>
// 										<td className="p-3">
// 											{artifact.description}
// 										</td>
// 										<td className="p-3 flex items-center">
// 											<Package className="text-gray-600 mr-2" />{' '}
// 											<a
// 												href={artifact.model3D}
// 												download
// 												className="text-blue-600"
// 											>
// 												Download
// 											</a>
// 										</td>
// 										<td className="p-3">
// 											{new Date(
// 												artifact.createdAt
// 											).toLocaleDateString()}
// 										</td>
// 										<td className="p-3 flex space-x-3">
// 											<FileText className="text-green-600 cursor-pointer" />
// 											<Download className="text-blue-600 cursor-pointer" />
// 											<Trash className="text-red-600 cursor-pointer" />
// 										</td>
// 									</tr>
// 								))}
// 							</tbody>
// 						</table>
// 					)}
// 				</Card>
// 			</div>
// 		</div>
// 	);
// }

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtifacts, addArtifact } from '../redux/artifactSlice';
import Card from '../customComponents/Card';
import { FileText, Trash, Download, Package } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function UploadsPage() {
	const dispatch = useDispatch();

	const { items: artifacts, status } = useSelector(
		(state) => state.artifacts
	);

	console.log(`ARTIFACTS: ${artifacts}`);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		image: null,
		model3D: null,
	});

	useEffect(() => {
		dispatch(fetchArtifacts());
	}, [dispatch]);

	// Handle text input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle file input changes
	const handleFileChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.files[0],
		});
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('name', formData.title);
		data.append('description', formData.description);
		data.append('image', formData.image);
		data.append('model3D', formData.model3D);
		dispatch(addArtifact(data));
	};

	return (
		<div>
			<Navbar />
			<div className="p-6 bg-[#2C2C2C] mt-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Artifact Uploads
				</h2>

				<Card
					title="Upload New Artifact "
					className="bg-[#2C2C2C] p-6 rounded-lg text-white mb-4"
				>
					<form
						onSubmit={handleSubmit}
						className="space-y-4 bg-[#2C2C2C] p-4 rounded-lg"
					>
						<input
							type="text"
							name="title"
							placeholder="Title"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<textarea
							name="description"
							placeholder="Description"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						></textarea>
						<input
							type="file"
							name="image"
							accept="image/*"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleFileChange}
						/>
						<input
							type="file"
							name="model3D"
							accept=".obj,.glb,.stl"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleFileChange}
						/>
						<button
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							Upload Artifact
						</button>
					</form>
				</Card>

				{/* Uploaded Artifacts */}
				<Card
					title="Uploaded Artifacts"
					className="bg-[#2C2C2C] p-6 rounded-lg text-white"
				>
					{status === 'loading' ? (
						<p>Loading...</p>
					) : status === 'failed' ? (
						<p>Error loading artifacts</p>
					) : (
						<table className="w-full text-left border-collapse bg-[#2C2C2C] text-white">
							<thead>
								<tr className="border-b">
									<th className="p-3">Image</th>
									<th className="p-3">Title</th>
									<th className="p-3">Description</th>
									<th className="p-3">3D Model</th>
									<th className="p-3">Upload Date</th>
									<th className="p-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								{artifacts?.map((artifact) => (
									<tr
										key={artifact._id}
										className="border-b"
									>
										<td className="p-3">
											<img
												src={artifact.image}
												alt={artifact.name}
												className="h-10 w-10 object-cover rounded"
											/>
										</td>
										<td className="p-3">
											{artifact.name}
										</td>
										<td className="p-3">
											{artifact.description}
										</td>
										<td className="p-3 flex items-center">
											<Package className="text-gray-400 mr-2" />
											<a
												href={artifact.model3D}
												download
												className="text-blue-400"
											>
												Download
											</a>
										</td>
										<td className="p-3">
											{new Date(
												artifact.createdAt
											).toLocaleDateString()}
										</td>
										<td className="p-3 flex space-x-3">
											<FileText className="text-green-400 cursor-pointer" />
											<Download className="text-blue-400 cursor-pointer" />
											<Trash className="text-red-400 cursor-pointer" />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</Card>
			</div>
		</div>
	);
}
