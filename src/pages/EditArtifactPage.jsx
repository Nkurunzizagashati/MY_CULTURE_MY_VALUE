import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateArtifact } from '../redux/artifactSlice';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';

export default function EditArtifactPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { items: artifacts } = useSelector(
		(state) => state.artifacts
	);
	const artifact = artifacts.find((art) => art._id === id);

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

	// Populate the form when artifact data is available
	useEffect(() => {
		if (artifact) {
			setFormData({
				title_kin: artifact.title_kin || '',
				title_en: artifact.title_en || '',
				description_kin: artifact.description_kin || '',
				description_en: artifact.description_en || '',
				origin_kin: artifact.origin_kin || '',
				origin_en: artifact.origin_en || '',
				materials_kin: artifact.materials_kin || '',
				materials_en: artifact.materials_en || '',
				usage_kin: artifact.usage_kin || '',
				usage_en: artifact.usage_en || '',
				image: artifact.image || null,
				model3D: artifact.model3D || null,
			});
		}
	}, [artifact]);

	// Handle text input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle file uploads
	const handleFileChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.files[0],
		});
	};

	// Function to detect and return modified fields
	const getModifiedData = () => {
		let modifiedData = {};

		Object.keys(formData).forEach((key) => {
			if (key === 'image' || key === 'model3D') {
				if (formData[key] && formData[key] !== artifact[key]) {
					modifiedData[key] = formData[key]; // Keep file references
				}
			} else if (formData[key] !== artifact[key]) {
				modifiedData[key] = formData[key]; // Track text changes
			}
		});

		console.log('🔍 Modified Data:', modifiedData);
		return modifiedData;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const modifiedData = getModifiedData();

		if (Object.keys(modifiedData).length === 0) {
			toast.info('No changes detected!');
			return;
		}

		let requestData = new FormData();

		// Append modified fields to FormData
		Object.keys(modifiedData).forEach((key) => {
			if (modifiedData[key] instanceof File) {
				requestData.append(key, modifiedData[key]); // Append files
			} else {
				requestData.append(key, String(modifiedData[key])); // Convert text fields to strings
			}
			console.log(`✅ Added field: ${key} →`, modifiedData[key]);
		});

		// Debug: Check if FormData has content
		console.log('📤 Sending FormData:');
		for (let pair of requestData.entries()) {
			console.log(pair[0], pair[1]);
		}

		// Test: Ensure FormData is not empty
		requestData.append('debug_check', 'test_value');
		console.log('📌 FormData keys:', [...requestData.keys()]);

		try {
			await dispatch(
				updateArtifact({ id, data: requestData })
			).unwrap();
			toast.success('Artifact updated successfully!');
		} catch (error) {
			toast.error(error || 'failed to update artifact');
			console.error('❌ Update Error:', error);
		}
	};

	return (
		<div>
			<Navbar />
			<ToastContainer position="top-right" autoClose={3000} />
			<div className="p-6 bg-[#2C2C2C] mt-6 text-white">
				<h2 className="text-2xl font-semibold mb-6">
					Edit Artifact
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<fieldset className="border p-4 rounded">
						<legend className="text-gray-300 font-semibold">
							Basic Information
						</legend>
						<div>
							<label className="text-gray-400">
								Title (Kinyarwanda)
							</label>
							<input
								type="text"
								name="title_kin"
								className="w-full p-2 border rounded bg-gray-700 text-white"
								value={formData.title_kin}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label className="text-gray-400">
								Title (English)
							</label>
							<input
								type="text"
								name="title_en"
								className="w-full p-2 border rounded bg-gray-700 text-white"
								value={formData.title_en}
								onChange={handleChange}
							/>
						</div>
					</fieldset>

					<fieldset className="border p-4 rounded">
						<legend className="text-gray-300 font-semibold">
							Description
						</legend>
						<div>
							<label className="text-gray-400">
								Description (Kinyarwanda)
							</label>
							<textarea
								name="description_kin"
								className="w-full p-2 border rounded bg-gray-700 text-white"
								value={formData.description_kin}
								onChange={handleChange}
							></textarea>
						</div>
						<div>
							<label className="text-gray-400">
								Description (English)
							</label>
							<textarea
								name="description_en"
								className="w-full p-2 border rounded bg-gray-700 text-white"
								value={formData.description_en}
								onChange={handleChange}
							></textarea>
						</div>
					</fieldset>

					<fieldset className="border p-4 rounded">
						<legend className="text-gray-300 font-semibold">
							Media
						</legend>
						<div>
							<label className="text-gray-400">
								Image
							</label>
							<input
								type="file"
								name="image"
								accept="image/*"
								className="w-full p-2 border rounded bg-gray-700 text-white"
								onChange={handleFileChange}
							/>
						</div>
						<div>
							<label className="text-gray-400">
								3D Model
							</label>
							<input
								type="file"
								name="model3D"
								accept=".obj,.glb,.stl"
								className="w-full p-2 border rounded bg-gray-700 text-white"
								onChange={handleFileChange}
							/>
						</div>
					</fieldset>

					<button
						type="submit"
						className="bg-blue-600 px-4 py-2 rounded"
						disabled={status === 'loading'} // Disable when updating
					>
						{status === 'loading'
							? 'Updating...'
							: 'Update Artifact'}
					</button>
				</form>
			</div>
		</div>
	);
}
