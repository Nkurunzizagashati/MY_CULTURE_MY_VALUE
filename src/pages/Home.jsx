import { useSelector } from 'react-redux';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
	const artifacts = useSelector((state) => state.artifacts.items);
	const hasEnoughSlides = artifacts.length > 2;

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			if (i < rating) {
				stars.push(
					<FaStar key={i} className="text-yellow-500" />
				);
			} else if (i < rating + 0.5) {
				stars.push(
					<FaStarHalfAlt
						key={i}
						className="text-yellow-500"
					/>
				);
			} else {
				stars.push(
					<FaStar key={i} className="text-gray-300" />
				);
			}
		}
		return stars;
	};

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

	return (
		<>
			<Navbar />
			<Parallax
				pages={3}
				className="h-screen w-full bg-[#2C2C2C]"
			>
				{/* Background Image */}
				<ParallaxLayer
					offset={0}
					speed={0.5}
					className="absolute inset-0 w-full h-full"
				>
					<img
						src="/akagera.jpg"
						alt="Rwandan Landscape"
						className="w-full h-full object-cover"
					/>
				</ParallaxLayer>

				{/* Hero Section */}
				<ParallaxLayer
					offset={0.3}
					speed={0.1}
					className="flex justify-center items-center p-10"
				>
					<div className="max-w-3xl text-center text-white space-y-6 bg-black bg-opacity-50 p-6 rounded-lg">
						<h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
							Discover Rwanda’s Cultural Heritage
						</h1>
						<p className="text-lg leading-relaxed">
							Uncover the timeless beauty of Rwandan
							artifacts—woven baskets, royal drums, and
							ancient tools. Each piece carries the legacy
							of our ancestors, preserving Rwanda’s rich
							history.
						</p>
					</div>
				</ParallaxLayer>

				{/* Featured Artifacts Section */}
				<ParallaxLayer offset={1} speed={0.5} className="p-10">
					<div className="max-w-5xl mx-auto text-center bg-[#2C2C2C] bg-opacity-90 p-6 rounded-lg shadow-lg">
						<h3 className="text-3xl font-bold text-white mb-8">
							Featured Artifacts
						</h3>

						<Swiper
							modules={[Navigation, Pagination, Autoplay]}
							spaceBetween={20}
							slidesPerView={1}
							loop={hasEnoughSlides}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							pagination={{ clickable: true }}
							navigation={false}
							breakpoints={{
								640: { slidesPerView: 1 },
								768: { slidesPerView: 2 },
								1024: { slidesPerView: 2 },
							}}
							className="w-full"
						>
							{artifacts.length > 0 ? (
								artifacts.map((artifact, index) => (
									<SwiperSlide key={artifact._id}>
										<div className="p-4 border rounded-lg shadow-lg hover:shadow-2xl bg-white transition duration-300 flex flex-col h-[380px]">
											<img
												src={artifact.image}
												alt={artifact.name}
												className="h-40 w-full object-cover rounded-lg mb-4"
											/>

											<div className="flex-grow flex flex-col justify-between">
												<h4 className="text-xl font-semibold text-gray-900">
													{artifact.name}
												</h4>
												<p className="text-gray-600 text-sm flex-grow line-clamp-3">
													{
														artifact.description
													}
												</p>

												{/* Ratings */}
												<div className="flex items-center justify-center mt-2 space-x-1">
													{renderStars(
														(index % 5) + 1
													)}
												</div>

												{/* Call to Action */}
												<button className="mt-3 bg-[#E25822] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition">
													View Artifact
												</button>
											</div>
										</div>
									</SwiperSlide>
								))
							) : (
								<p className="text-gray-500">
									No artifacts available
								</p>
							)}
						</Swiper>
					</div>
				</ParallaxLayer>

				{/* User Testimonials Section */}
				<ParallaxLayer offset={2} speed={0.5} className="p-10">
					<div className="text-center bg-[#2C2C2C] text-white">
						<h3 className="text-3xl font-bold mb-6">
							What Our Users Say
						</h3>
						<Swiper
							modules={[Pagination, Autoplay]}
							slidesPerView={1}
							autoplay={{
								delay: 4000,
								disableOnInteraction: false,
							}}
							pagination={{ clickable: true }}
							className="w-full max-w-3xl mx-auto"
						>
							{testimonials.map((testimonial, index) => (
								<SwiperSlide key={index}>
									<div className="p-6 bg-white text-gray-900 rounded-lg shadow-lg">
										<p className="italic">
											“{testimonial.text}”
										</p>
										<h4 className="mt-4 font-semibold">
											- {testimonial.name}
										</h4>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					{/* Call to Action */}
					<div className="p-10 bg-[#E25822] text-center text-white mt-40 rounded-lg">
						<h3 className="text-3xl font-bold mb-4">
							Join Our Community
						</h3>
						<p className="max-w-xl mx-auto mb-6">
							Become part of a growing community
							passionate about Rwandan heritage. Stay
							updated and connect with others!
						</p>
						<button className="bg-white text-[#E25822] font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition">
							Subscribe Now
						</button>
					</div>
				</ParallaxLayer>
			</Parallax>
			<Footer />
		</>
	);
};

export default Home;
