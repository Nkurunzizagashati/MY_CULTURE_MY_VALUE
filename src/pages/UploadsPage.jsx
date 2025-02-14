import { useState } from 'react';
import Card from '../customComponents/Card';
import {
	Upload,
	FileText,
	Trash,
	Download,
	Image,
	Package,
} from 'lucide-react';
import Navbar from '../components/Navbar';

const initialUploads = [
	{
		id: 1,
		title: 'Ancient Vase',
		description: 'A historical vase from the 18th century.',
		image: '/images/vase.png',
		model: 'vase.obj',
		size: '3.5MB',
		date: 'Feb 12, 2025',
		status: 'Completed',
	},
	{
		id: 2,
		title: 'Wooden Sculpture',
		description: 'Hand-carved wooden sculpture.',
		image: '/images/sculpture.png',
		model: 'sculpture.glb',
		size: '5.2MB',
		date: 'Feb 10, 2025',
		status: 'Processing',
	},
];

export default function UploadsPage() {
	const [uploads, setUploads] = useState(initialUploads);

	return (
		<div>
			<Navbar />
			<div className="p-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Artifact Uploads
				</h2>

				{/* Upload Form */}
				<Card title="Upload New Artifact">
					<form className="space-y-4">
						<input
							type="text"
							placeholder="Title"
							className="w-full p-2 border rounded"
						/>
						<textarea
							placeholder="Description"
							className="w-full p-2 border rounded"
						></textarea>
						<input
							type="file"
							accept="image/*"
							className="w-full p-2 border rounded"
						/>
						<input
							type="file"
							accept=".obj,.glb,.stl"
							className="w-full p-2 border rounded"
						/>
						<button className="bg-blue-600 text-white px-4 py-2 rounded">
							Upload Artifact
						</button>
					</form>
				</Card>

				{/* Uploaded Artifacts */}
				<Card title="Uploaded Artifacts">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="border-b">
								<th className="p-3">Image</th>
								<th className="p-3">Title</th>
								<th className="p-3">Description</th>
								<th className="p-3">3D Model</th>
								<th className="p-3">Size</th>
								<th className="p-3">Upload Date</th>
								<th className="p-3">Status</th>
								<th className="p-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{uploads.map((artifact) => (
								<tr
									key={artifact.id}
									className="border-b"
								>
									<td className="p-3">
										<img
											src={artifact.image}
											alt={artifact.title}
											className="h-10 w-10 object-cover rounded"
										/>
									</td>
									<td className="p-3">
										{artifact.title}
									</td>
									<td className="p-3">
										{artifact.description}
									</td>
									<td className="p-3 flex items-center">
										<Package className="text-gray-600 mr-2" />{' '}
										{artifact.model}
									</td>
									<td className="p-3">
										{artifact.size}
									</td>
									<td className="p-3">
										{artifact.date}
									</td>
									<td className="p-3 text-blue-600">
										{artifact.status}
									</td>
									<td className="p-3 flex space-x-3">
										<FileText className="text-green-600 cursor-pointer" />
										<Download className="text-blue-600 cursor-pointer" />
										<Trash className="text-red-600 cursor-pointer" />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Card>
			</div>
		</div>
	);
}
