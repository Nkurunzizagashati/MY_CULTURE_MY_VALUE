import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtifacts, addArtifact } from '../redux/artifactSlice';
import Card from '../customComponents/Card';
import { FileText, Trash, Download, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadsPage() {
	const dispatch = useDispatch();
	const { items: artifacts, status } = useSelector(
		(state) => state.artifacts
	);

	const [isUploading, setIsUploading] = useState(false);
	const [formData, setFormData] = useState({
		title_kin: '',
		title_en: '',
		description_kin: '',
		description_en: '',
		origin_kin: '',
		origin_en: '',
		materials_kin: '',
		materials_en: '',
		usage_kin: '',
		usage_en: '',
		image: null,
		model3D: null,
	});

	useEffect(() => {
		dispatch(fetchArtifacts());
	}, [dispatch]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.files[0],
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsUploading(true); // Start upload state

		const data = new FormData();
		Object.keys(formData).forEach((key) =>
			data.append(key, formData[key])
		);

		try {
			await dispatch(addArtifact(data)).unwrap(); // Ensure action is completed
			toast.success('Artifact uploaded successfully!'); // Show success message
			setFormData({
				title_kin: '',
				title_en: '',
				description_kin: '',
				description_en: '',
				origin_kin: '',
				origin_en: '',
				materials_kin: '',
				materials_en: '',
				usage_kin: '',
				usage_en: '',
				image: null,
				model3D: null,
			});
			dispatch(fetchArtifacts()); // Refresh artifacts list
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsUploading(false); // Reset upload state
		}
	};

	return (
		<div>
			<Navbar />
			<div className="p-6 bg-[#2C2C2C] mt-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Artifact Uploads
				</h2>

				<Card
					title="Upload New Artifact"
					className="bg-[#2C2C2C] p-6 rounded-lg text-white mb-4"
				>
					<form
						onSubmit={handleSubmit}
						className="space-y-4 bg-[#2C2C2C] p-4 rounded-lg"
					>
						<input
							type="text"
							name="title_kin"
							placeholder="Title (Kinyarwanda)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="title_en"
							placeholder="Title (English)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<textarea
							name="description_kin"
							placeholder="Description (Kinyarwanda)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						></textarea>
						<textarea
							name="description_en"
							placeholder="Description (English)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						></textarea>
						<input
							type="text"
							name="origin_kin"
							placeholder="Origin & History (Kinyarwanda)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="origin_en"
							placeholder="Origin & History (English)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="materials_kin"
							placeholder="Materials & Construction (Kinyarwanda)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="materials_en"
							placeholder="Materials & Construction (English)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="usage_kin"
							placeholder="Usage & Importance (Kinyarwanda)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
						<input
							type="text"
							name="usage_en"
							placeholder="Usage & Importance (English)"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleChange}
						/>
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
							{isUploading
								? 'Uploading...'
								: 'Upload Artifact'}
						</button>
					</form>
				</Card>

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
									<th className="p-3">
										Title (Kin / En)
									</th>
									<th className="p-3">
										Description (Kin / En)
									</th>
									<th className="p-3">
										Origin (Kin / En)
									</th>
									<th className="p-3">
										Materials (Kin / En)
									</th>
									<th className="p-3">
										Usage (Kin / En)
									</th>
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
												alt={artifact.title_kin}
												className="h-10 w-10 object-cover rounded"
											/>
										</td>
										<td className="p-3">
											<strong>
												{artifact.title_kin}
											</strong>{' '}
											<br /> {artifact.title_en}
										</td>
										<td className="p-3">
											{artifact.description_kin}{' '}
											<br />{' '}
											{artifact.description_en}
										</td>
										<td className="p-3">
											{artifact.origin_kin} <br />{' '}
											{artifact.origin_en}
										</td>
										<td className="p-3">
											{artifact.materials_kin}{' '}
											<br />{' '}
											{artifact.materials_en}
										</td>
										<td className="p-3">
											{artifact.usage_kin} <br />{' '}
											{artifact.usage_en}
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
