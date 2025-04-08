import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchNewsletters,
	sendNewsletter,
} from '../redux/newsletterSlice';
import Navbar from '../components/Navbar';
import Card from '../customComponents/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { backendUrl } from '../config';

const socket = io(backendUrl);

const Newsletter = () => {
	const dispatch = useDispatch();
	const {
		items: newsletters,
		status,
		error,
	} = useSelector((state) => state.newsletters);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		file: null,
	});

	useEffect(() => {
		dispatch(fetchNewsletters());
	}, [dispatch]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, file: e.target.files[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!formData.title ||
			!formData.description ||
			!formData.file
		) {
			toast.error('All fields are required!');
			return;
		}

		const data = new FormData();
		data.append('title', formData.title);
		data.append('description', formData.description);
		data.append('file', formData.file);

		try {
			await dispatch(sendNewsletter(data)).unwrap();
			toast.success('Newsletter sent successfully!');
			setFormData({ title: '', description: '', file: null });
		} catch (error) {
			toast.error(error || 'Error sending newsletter');
		}
	};

	useEffect(() => {
		socket.on('newslettersChanged', (data) => {
			console.log(data);
			dispatch(fetchNewsletters());
		});
	}, [dispatch]);

	return (
		<div>
			<Navbar />
			<ToastContainer position="top-right" autoClose={3000} />
			<div className="p-6 bg-[#2C2C2C] mt-6 text-white">
				<h2 className="text-2xl font-semibold mb-6">
					Newsletters
				</h2>

				<Card
					title="Create Newsletter"
					className="p-6 rounded-lg text-white mb-4"
				>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							name="title"
							required
							placeholder="Newsletter Title"
							className="w-full p-2 border rounded bg-gray-700 text-white"
							value={formData.title}
							onChange={handleChange}
						/>
						<textarea
							name="description"
							placeholder="Description"
							required
							className="w-full p-2 border rounded bg-gray-700 text-white"
							value={formData.description}
							onChange={handleChange}
						></textarea>
						<input
							type="file"
							name="file"
							required
							className="w-full p-2 border rounded bg-gray-700 text-white"
							onChange={handleFileChange}
						/>
						<button
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							Send Newsletter
						</button>
					</form>
				</Card>

				<Card
					title="Sent Newsletters"
					className="p-6 rounded-lg text-white"
				>
					{status === 'loading' && (
						<p>Loading newsletters...</p>
					)}
					{error && <p className="text-red-500">{error}</p>}
					{status === 'succeeded' &&
					newsletters.length > 0 ? (
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="border-b border-gray-600">
									<th className="p-2">Title</th>
									<th className="p-2">Description</th>
									<th className="p-2">File</th>
									<th className="p-2">Date Sent</th>
								</tr>
							</thead>
							<tbody>
								{newsletters.map((newsletter) => (
									<tr
										key={newsletter.id}
										className="border-b border-gray-700"
									>
										<td className="p-2">
											{newsletter.title}
										</td>
										<td className="p-2">
											{newsletter.description}
										</td>
										<td className="p-2">
											<a
												href={
													newsletter.file_url
												}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-400"
											>
												View File
											</a>
										</td>
										<td className="p-2">
											{new Date(
												newsletter.createdAt
											).toLocaleDateString(
												'en-GB'
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No newsletters available.</p>
					)}
				</Card>
			</div>
		</div>
	);
};

export default Newsletter;
