import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchArtifacts,
	addArtifact,
	deleteArtifact,
} from '../redux/artifactSlice';
import Card from '../customComponents/Card';
import { FileText, Trash, Package, Edit } from 'lucide-react';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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

	const [deletingArtifactId, setDeletingArtifactId] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedArtifactId, setSelectedArtifactId] = useState(null);

	const confirmDelete = (artifactId) => {
		setSelectedArtifactId(artifactId);
		setShowModal(true);
	};

	const handleDelete = async () => {
		if (!selectedArtifactId) return;
		setDeletingArtifactId(selectedArtifactId);
		setShowModal(false);

		try {
			await dispatch(deleteArtifact(selectedArtifactId)).unwrap();
			toast.success('Artifact deleted successfully!');
		} catch (error) {
			console.log(error);
			toast.error('Failed to delete artifact.');
		} finally {
			setDeletingArtifactId(null);
		}
	};

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
			<ToastContainer position="top-right" autoClose={3000} />
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

				{showModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
						<div className="bg-white p-6 rounded-lg shadow-lg text-center">
							<p className="text-lg font-semibold mb-4">
								Are you sure you want to delete this
								artifact?
							</p>
							<div className="flex justify-center space-x-4">
								<button
									onClick={() => setShowModal(false)}
									className="bg-gray-500 text-white px-4 py-2 rounded"
								>
									Cancel
								</button>
								<button
									onClick={handleDelete}
									className="bg-red-600 text-white px-4 py-2 rounded"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}

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
												alt={artifact.title_kin}
												className="h-10 w-10 object-cover rounded"
											/>
										</td>
										<td className="p-3 align-top">
											<strong>
												{artifact.title_kin}
											</strong>
											{' / '}
											<strong>
												{artifact.title_en}
											</strong>
										</td>
										<td className="p-3 flex items-center align-top">
											<Package className="text-gray-400 mr-2" />
											<a
												href={artifact.model3D}
												download
												className="text-blue-400"
											>
												Download
											</a>
										</td>
										<td className="p-3 align-top">
											{new Date(
												artifact.createdAt
											).toLocaleDateString()}
										</td>
										<td className="p-3 flex space-x-3 align-top">
											<FileText className="text-green-400 cursor-pointer" />
											<Link
												to={`/artifact/edit/${artifact._id}`}
											>
												<Edit className="text-blue-400 cursor-pointer" />
											</Link>
											<button
												disabled={
													deletingArtifactId ===
													artifact._id
												}
												onClick={() =>
													confirmDelete(
														artifact._id
													)
												}
												className={`text-red-400 cursor-pointer ${
													deletingArtifactId ===
													artifact._id
														? 'opacity-50 cursor-not-allowed'
														: ''
												}`}
											>
												<Trash />
											</button>
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
