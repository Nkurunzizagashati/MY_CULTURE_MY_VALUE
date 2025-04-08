import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubscribeModal from '../customComponents/SubscribeModal';
import {
	addSubscriber,
	checkSubscriptionStatus,
	unsubscribeSlice,
} from '../redux/subscriberSlice';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { backendUrl } from '../config';

const socket = io(backendUrl, { autoConnect: false });

const Home = () => {
	const artifacts = useSelector((state) => state.artifacts.items);
	const isSubscribed = useSelector(
		(state) => state.subscribers.isSubscribed
	);

	const dispatch = useDispatch();

	const testimonials = [
		{
			name: 'Jean Claude',
			text: 'This platform helped me learn so much about Rwandan culture. The 3D models are amazing!',
		},
		{
			name: 'Aline Mukamana',
			text: 'I never knew our history was this rich. The artifacts are beautifully preserved here.',
		},
		{
			name: 'David Nshimiyimana',
			text: 'A must-visit for anyone interested in Rwanda’s cultural heritage!',
		},
	];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [bgColor, setBgColor] = useState('#2C2C2C');

	const subscribe = () => {
		try {
			dispatch(addSubscriber());

			toast.success('Subscription successful!');
			setIsModalOpen(false);
		} catch (error) {
			toast.error(error);
		}
	};

	const unsubscribe = () => {
		try {
			console.log('UNSUBSCRIBING ...');
			dispatch(unsubscribeSlice());
			toast.info('Unsubscribed successfully');
			setIsModalOpen(false);
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		socket.connect();
		socket.on('subscriptionChanges', (data) => {
			console.log(data);
			dispatch(checkSubscriptionStatus());
		});
		dispatch(checkSubscriptionStatus());
		const handleScroll = () => {
			const scrollY = window.scrollY;
			if (scrollY < 400) setBgColor('#2C2C2C');
			else if (scrollY < 1000) setBgColor('#1A1A1A');
			else setBgColor('#0E0E0E');
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [dispatch]);

	return (
		<div
			style={{
				backgroundColor: bgColor,
				transition: 'background-color 0.5s ease',
			}}
			className="min-h-screen"
		>
			<Navbar />
			<ToastContainer position="top-right" autoClose={3000} />

			{/* Hero Section */}
			<section
				className="h-screen flex items-center justify-center text-white text-center px-6 bg-cover bg-center bg-fixed"
				style={{
					backgroundImage: "url('/akagera.jpg')",
				}}
			>
				<div className="max-w-3xl bg-black/50 p-8 rounded-lg mt-80">
					<h1 className="text-5xl font-bold">
						Discover Rwanda&apos;s Cultural Heritage
					</h1>
					<p className="mt-4 text-lg">
						Uncover the timeless beauty of Rwandan
						artifacts-woven baskets, royal drums, and
						ancient tools. Each piece carries the legacy of
						our ancestors, preserving Rwanda&apos;s rich
						history.
					</p>
				</div>
			</section>

			{/* Featured Artifacts Section */}
			<section className="p-10">
				<h2 className="text-3xl text-white font-bold text-center mb-8">
					Featured Artifacts
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{artifacts.slice(0, 3).map((artifact) => (
						<div
							key={artifact._id}
							className="relative bg-white p-4 rounded-lg shadow-lg overflow-hidden group"
						>
							<img
								src={
									artifact?.image?.includes(
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
								className="w-full h-48 object-cover rounded-lg"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition flex flex-col justify-center items-center opacity-0 text-white group-hover:opacity-100 p-4">
								<h3 className="text-xl font-semibold">
									{artifact.title_en}
								</h3>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="p-10">
				<h2 className="text-3xl text-white font-bold text-center mb-8">
					What Our Users Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
						>
							<p className="italic">
								“{testimonial.text}”
							</p>
							<h4 className="mt-4 font-semibold">
								- {testimonial.name}
							</h4>
						</div>
					))}
				</div>
			</section>

			{/* Subscribe Section */}
			<section className="p-10 bg-[#E25822] text-white text-center rounded-lg mb-10 mx-9">
				<h2 className="text-3xl font-bold">
					Subscribe to our newsletter
				</h2>
				<p className="max-w-xl mx-auto mt-4">
					Stay updated and connect with others passionate
					about Rwandan heritage.
				</p>
				<button
					onClick={() => setIsModalOpen(true)}
					className="mt-4 bg-white text-[#E25822] font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition"
				>
					{!isSubscribed ? 'Subscribe Now' : 'Unsubscribe'}
				</button>
			</section>

			<SubscribeModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={isSubscribed ? unsubscribe : subscribe}
				message={
					isSubscribed
						? 'Are you sure you want to unsubscribe?'
						: 'By subscribing, you agree to receive our newsletters via email'
				}
				title={
					isSubscribed
						? 'Unsubscribe'
						: 'Subscribe to Newsletter'
				}
			/>
			<Footer />
		</div>
	);
};

export default Home;
