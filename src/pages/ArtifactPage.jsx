// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Menu, MenuItem, MenuButton } from '@headlessui/react';
// import {
// 	FaEllipsisV,
// 	FaRegStar,
// 	FaStar,
// 	FaStarHalfAlt,
// } from 'react-icons/fa';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import ReviewBox from '../customComponents/ReviewBox';
// import { addRating } from '../redux/ratingSlice';

// const ArtifactPage = () => {
// 	const { id } = useParams();
// 	const [isEnglish, setIsEnglish] = useState(true);
// 	const artifacts = useSelector((state) => state.artifacts.items);
// 	const [artifact, setArtifact] = useState(null);
// 	const [showShareBox, setShowShareBox] = useState(false);
// 	const [copySuccess, setCopySuccess] = useState('');
// 	const [openReviewBox, setOpenReviewBox] = useState(false);
// 	const [rating, setRating] = useState('');
// 	const [reviewMessage, setReviewMessage] = useState('');

// 	const ratings = useSelector((state) =>
// 		state.ratings.items?.reviews?.filter(
// 			(review) => review?.artifact === id
// 		)
// 	);

// 	const dispatch = useDispatch();

// 	const handleAddReview = async () => {
// 		try {
// 			// Construct the review data
// 			const reviewData = {
// 				rating,
// 				message: reviewMessage,
// 			};

// 			// Dispatch the addRating action
// 			const resultAction = dispatch(
// 				addRating({ artifactId: id, ratingData: reviewData })
// 			);

// 			// Check if the request was fulfilled
// 			if (addRating.fulfilled.match(resultAction)) {
// 				console.log(
// 					'Review submitted successfully:',
// 					resultAction.payload
// 				);
// 				alert('Review submitted successfully!');
// 				setOpenReviewBox(false); // Close the review box
// 			} else {
// 				throw new Error(
// 					resultAction.payload || 'Failed to submit review'
// 				);
// 			}
// 		} catch (error) {
// 			console.error('Error submitting review:', error);
// 			alert(`Error submitting review: ${error.message}`);
// 		}
// 	};

// 	const renderStars = (rating) => {
// 		const fullStars = Math.floor(rating);
// 		const halfStar = rating % 1 >= 0.5;
// 		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

// 		return (
// 			<div className="flex text-yellow-400">
// 				{[...Array(fullStars)].map((_, i) => (
// 					<FaStar key={`full-${i}`} />
// 				))}
// 				{halfStar && <FaStarHalfAlt />}
// 				{[...Array(emptyStars)].map((_, i) => (
// 					<FaRegStar key={`empty-${i}`} />
// 				))}
// 			</div>
// 		);
// 	};

// 	useEffect(() => {
// 		const foundArtifact = artifacts.find((item) => item._id === id);
// 		setArtifact(foundArtifact);
// 	}, [id, artifacts]);

// 	const toggleLanguage = () => {
// 		setIsEnglish(!isEnglish);
// 	};

// 	const handleShare = () => {
// 		setShowShareBox(!showShareBox);
// 	};

// 	const handleReview = () => {
// 		setOpenReviewBox(!openReviewBox);
// 	};

// 	const copyToClipboard = () => {
// 		navigator.clipboard.writeText(window.location.href).then(() => {
// 			setCopySuccess('Link copied!');
// 			setTimeout(() => setCopySuccess(''), 2500);
// 		});
// 	};

// 	if (!artifact) {
// 		return (
// 			<div className="min-h-screen flex items-center justify-center bg-[#2C2C2C] text-white">
// 				<p>Loading artifact details...</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="min-h-screen bg-[#2C2C2C] text-white artifact">
// 			<Navbar />
// 			<section className="py-28 px-6 max-w-4xl mx-auto bg-[#3A3A3A] shadow-md rounded-lg p-6">
// 				<img
// 					src={
// 						artifact.image.includes('res.cloudinary.com')
// 							? `https://res.cloudinary.com/dhuwnnvuj/image/upload/w_600,q_auto,f_auto/${
// 									artifact.image.split(
// 										'image/upload/'
// 									)[1]
// 							  }`
// 							: `https://res.cloudinary.com/dhuwnnvuj/image/upload/w_600,q_auto,f_auto/${artifact.image}`
// 					}
// 					alt={
// 						isEnglish
// 							? artifact.title_en
// 							: artifact.title_kin
// 					}
// 					className="w-full h-64 object-cover rounded-lg mb-4"
// 				/>
// 				<h1 className="text-3xl font-bold mb-6 text-[#E25822] text-center">
// 					{isEnglish ? artifact.title_en : artifact.title_kin}
// 				</h1>

// 				<div className="relative flex justify-end">
// 					<Menu as="div" className="relative">
// 						<MenuButton className="text-white text-2xl">
// 							<FaEllipsisV />
// 						</MenuButton>
// 						<Menu.Items className="absolute right-0 mt-2 w-48 bg-[#3A3A3A] shadow-md rounded-lg p-2">
// 							<MenuItem>
// 								{({ active }) => (
// 									<button
// 										onClick={toggleLanguage}
// 										className={`block w-full text-left px-4 py-2 rounded-lg ${
// 											active
// 												? 'bg-gray-700 text-white'
// 												: 'text-gray-300'
// 										}`}
// 									>
// 										{isEnglish
// 											? 'Translate to Kin'
// 											: 'Translate to En'}
// 									</button>
// 								)}
// 							</MenuItem>
// 							<MenuItem>
// 								{({ active }) => (
// 									<Link
// 										to={`/artifacts/ar/${
// 											artifact._id
// 										}?model=${encodeURIComponent(
// 											artifact.model3D
// 										)}`}
// 										className={`block w-full text-left px-4 py-2 rounded-lg ${
// 											active
// 												? 'bg-gray-700 text-white'
// 												: 'text-gray-300'
// 										}`}
// 									>
// 										{isEnglish
// 											? 'View in AR'
// 											: 'Reba muri AR'}
// 									</Link>
// 								)}
// 							</MenuItem>
// 							<MenuItem>
// 								{({ active }) => (
// 									<button
// 										onClick={handleShare}
// 										className={`block w-full text-left px-4 py-2 rounded-lg ${
// 											active
// 												? 'bg-gray-700 text-white'
// 												: 'text-gray-300'
// 										}`}
// 									>
// 										Share
// 									</button>
// 								)}
// 							</MenuItem>
// 							<MenuItem>
// 								{({ active }) => (
// 									<button
// 										onClick={handleReview}
// 										className={`block w-full text-left px-4 py-2 rounded-lg ${
// 											active
// 												? 'bg-gray-700 text-white'
// 												: 'text-gray-300'
// 										}`}
// 									>
// 										Add a review
// 									</button>
// 								)}
// 							</MenuItem>
// 						</Menu.Items>
// 					</Menu>
// 				</div>

// 				{openReviewBox && (
// 					<ReviewBox
// 						rating={rating}
// 						setRating={setRating}
// 						reviewMessage={reviewMessage}
// 						setReviewMessage={setReviewMessage}
// 						onClose={() => setOpenReviewBox(false)}
// 						onSubmit={handleAddReview}
// 					/>
// 				)}

// 				{showShareBox && (
// 					<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// 						<div className="bg-[#3A3A3A] p-6 rounded-lg shadow-lg w-80 text-center">
// 							<h2 className="text-lg font-semibold mb-4">
// 								Share this artifact
// 							</h2>
// 							<input
// 								type="text"
// 								readOnly
// 								value={window.location.href}
// 								className="w-full p-2 rounded bg-gray-800 text-white mb-4"
// 							/>
// 							<button
// 								onClick={copyToClipboard}
// 								className="bg-blue-500 text-white px-4 py-2 rounded-lg"
// 							>
// 								{copySuccess
// 									? copySuccess
// 									: 'Copy Link'}
// 							</button>

// 							<button
// 								onClick={() => setShowShareBox(false)}
// 								className="block mt-4 text-red-400"
// 							>
// 								Close
// 							</button>
// 						</div>
// 					</div>
// 				)}

// 				<div className="space-y-6">
// 					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
// 						<h2 className="text-2xl font-semibold mb-2">
// 							{isEnglish ? 'Description' : 'Ibisobanuro'}
// 						</h2>
// 						<p className="text-gray-300">
// 							{isEnglish
// 								? artifact.description_en
// 								: artifact.description_kin}
// 						</p>
// 					</div>

// 					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
// 						<h2 className="text-2xl font-semibold mb-2">
// 							{isEnglish
// 								? 'Origin & History'
// 								: 'Inkomoko namateka'}
// 						</h2>
// 						<p className="text-gray-300">
// 							{isEnglish
// 								? artifact.origin_en
// 								: artifact.origin_kin}
// 						</p>
// 					</div>

// 					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
// 						<h2 className="text-2xl font-semibold mb-2">
// 							{isEnglish
// 								? 'Materials & Construction'
// 								: 'Ibigize igikoresho'}
// 						</h2>
// 						<p className="text-gray-300">
// 							{isEnglish
// 								? artifact.materials_en
// 								: artifact.materials_kin}
// 						</p>
// 					</div>

// 					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
// 						<h2 className="text-2xl font-semibold mb-2">
// 							{isEnglish
// 								? 'Usage & Importance'
// 								: 'Imikoreshereze nakamaro'}
// 						</h2>
// 						<p className="text-gray-300">
// 							{isEnglish
// 								? artifact.usage_en
// 								: artifact.usage_kin}
// 						</p>
// 					</div>
// 				</div>

// 				<h2 className="text-2xl font-semibold mt-10 mb-4">
// 					{isEnglish
// 						? 'User Reviews'
// 						: 'Ibitekerezo byabakoresha'}
// 				</h2>
// 				<div className="space-y-4">
// 					{ratings.length > 0 ? (
// 						ratings?.map((review, index) => (
// 							<div
// 								key={index}
// 								className="bg-[#444] p-4 rounded-lg shadow-md"
// 							>
// 								<p className="text-lg font-semibold text-[#E25822]">
// 									{review?.user?.fname}
// 								</p>
// 								<p className="text-gray-300">
// 									{review?.message}
// 								</p>
// 								{renderStars(review.rating)}
// 							</div>
// 						))
// 					) : (
// 						<div className="text-center text-gray-200">
// 							No review yet, be the first to rate the
// 							experience
// 						</div>
// 					)}
// 				</div>
// 			</section>
// 			<Footer />
// 		</div>
// 	);
// };

// export default ArtifactPage;

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem, MenuButton } from '@headlessui/react';
import {
	FaEllipsisV,
	FaRegStar,
	FaStar,
	FaStarHalfAlt,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewBox from '../customComponents/ReviewBox';
import { addRating } from '../redux/ratingSlice';

const ArtifactPage = () => {
	const { id } = useParams();
	const [isEnglish, setIsEnglish] = useState(true);
	const artifacts = useSelector((state) => state.artifacts.items);
	const [artifact, setArtifact] = useState(null);
	const [showShareBox, setShowShareBox] = useState(false);
	const [copySuccess, setCopySuccess] = useState('');
	const [openReviewBox, setOpenReviewBox] = useState(false);
	const [rating, setRating] = useState('');
	const [reviewMessage, setReviewMessage] = useState('');

	const ratings = useSelector((state) =>
		state.ratings.items?.reviews?.filter(
			(review) => review?.artifact === id
		)
	);

	const dispatch = useDispatch();

	const handleAddReview = async () => {
		try {
			// Construct the review data
			const reviewData = {
				rating,
				message: reviewMessage,
			};

			// Dispatch the addRating action
			const resultAction = dispatch(
				addRating({ artifactId: id, ratingData: reviewData })
			);

			// Check if the request was fulfilled
			if (addRating.fulfilled.match(resultAction)) {
				console.log(
					'Review submitted successfully:',
					resultAction.payload
				);
				alert('Review submitted successfully!');
				setOpenReviewBox(false); // Close the review box
			} else {
				throw new Error(
					resultAction.payload || 'Failed to submit review'
				);
			}
		} catch (error) {
			console.error('Error submitting review:', error);
			alert(`Error submitting review: ${error.message}`);
		}
	};

	const renderStars = (rating) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 >= 0.5;
		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

		return (
			<div className="flex text-yellow-400">
				{[...Array(fullStars)].map((_, i) => (
					<FaStar key={`full-${i}`} />
				))}
				{halfStar && <FaStarHalfAlt />}
				{[...Array(emptyStars)].map((_, i) => (
					<FaRegStar key={`empty-${i}`} />
				))}
			</div>
		);
	};

	useEffect(() => {
		const foundArtifact = artifacts.find((item) => item._id === id);
		setArtifact(foundArtifact);
	}, [id, artifacts]);

	const toggleLanguage = () => {
		setIsEnglish(!isEnglish);
	};

	const handleShare = () => {
		setShowShareBox(!showShareBox);
	};

	const handleReview = () => {
		setOpenReviewBox(!openReviewBox);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			setCopySuccess('Link copied!');
			setTimeout(() => setCopySuccess(''), 2500);
		});
	};

	if (!artifact) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#2C2C2C] text-white">
				<p>Loading artifact details...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#2C2C2C] text-white artifact">
			<Navbar />
			<section className="py-28 px-6 max-w-4xl mx-auto bg-[#3A3A3A] shadow-md rounded-lg p-6">
				<img
					src={
						artifact.image.includes('res.cloudinary.com')
							? `https://res.cloudinary.com/dhuwnnvuj/image/upload/w_600,q_auto,f_auto/${
									artifact.image.split(
										'image/upload/'
									)[1]
							  }`
							: `https://res.cloudinary.com/dhuwnnvuj/image/upload/w_600,q_auto,f_auto/${artifact.image}`
					}
					alt={
						isEnglish
							? artifact.title_en
							: artifact.title_kin
					}
					className="w-full h-64 object-cover rounded-lg mb-4"
				/>
				<h1 className="text-3xl font-bold mb-6 text-[#E25822] text-center">
					{isEnglish ? artifact.title_en : artifact.title_kin}
				</h1>

				<div className="relative flex justify-end">
					<Menu as="div" className="relative">
						<MenuButton className="text-white text-2xl">
							<FaEllipsisV />
						</MenuButton>
						<Menu.Items className="absolute right-0 mt-2 w-48 bg-[#3A3A3A] shadow-md rounded-lg p-2">
							<MenuItem>
								{({ active }) => (
									<button
										onClick={toggleLanguage}
										className={`block w-full text-left px-4 py-2 rounded-lg ${
											active
												? 'bg-gray-700 text-white'
												: 'text-gray-300'
										}`}
									>
										{isEnglish
											? 'Translate to Kin'
											: 'Translate to En'}
									</button>
								)}
							</MenuItem>
							<MenuItem>
								{({ active }) => (
									<Link
										to={`/artifacts/ar/${
											artifact._id
										}?model=${encodeURIComponent(
											artifact.model3D
										)}`}
										className={`block w-full text-left px-4 py-2 rounded-lg ${
											active
												? 'bg-gray-700 text-white'
												: 'text-gray-300'
										}`}
									>
										{isEnglish
											? 'View in AR'
											: 'Reba muri AR'}
									</Link>
								)}
							</MenuItem>
							<MenuItem>
								{({ active }) => (
									<button
										onClick={handleShare}
										className={`block w-full text-left px-4 py-2 rounded-lg ${
											active
												? 'bg-gray-700 text-white'
												: 'text-gray-300'
										}`}
									>
										Share
									</button>
								)}
							</MenuItem>
							<MenuItem>
								{({ active }) => (
									<button
										onClick={handleReview}
										className={`block w-full text-left px-4 py-2 rounded-lg ${
											active
												? 'bg-gray-700 text-white'
												: 'text-gray-300'
										}`}
									>
										Add a review
									</button>
								)}
							</MenuItem>
						</Menu.Items>
					</Menu>
				</div>

				{openReviewBox && (
					<ReviewBox
						rating={rating}
						setRating={setRating}
						reviewMessage={reviewMessage}
						setReviewMessage={setReviewMessage}
						onClose={() => setOpenReviewBox(false)}
						onSubmit={handleAddReview}
					/>
				)}

				{showShareBox && (
					<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
						<div className="bg-[#3A3A3A] p-6 rounded-lg shadow-lg w-80 text-center">
							<h2 className="text-lg font-semibold mb-4">
								Share this artifact
							</h2>
							<input
								type="text"
								readOnly
								value={window.location.href}
								className="w-full p-2 rounded bg-gray-800 text-white mb-4"
							/>
							<button
								onClick={copyToClipboard}
								className="bg-blue-500 text-white px-4 py-2 rounded-lg"
							>
								{copySuccess
									? copySuccess
									: 'Copy Link'}
							</button>

							<button
								onClick={() => setShowShareBox(false)}
								className="block mt-4 text-red-400"
							>
								Close
							</button>
						</div>
					</div>
				)}

				<div className="space-y-6">
					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-2">
							{isEnglish ? 'Description' : 'Ibisobanuro'}
						</h2>
						<p className="text-gray-300">
							{isEnglish
								? artifact.description_en
								: artifact.description_kin}
						</p>
					</div>

					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-2">
							{isEnglish
								? 'Origin & History'
								: 'Inkomoko namateka'}
						</h2>
						<p className="text-gray-300">
							{isEnglish
								? artifact.origin_en
								: artifact.origin_kin}
						</p>
					</div>

					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-2">
							{isEnglish
								? 'Materials & Construction'
								: 'Ibigize igikoresho'}
						</h2>
						<p className="text-gray-300">
							{isEnglish
								? artifact.materials_en
								: artifact.materials_kin}
						</p>
					</div>

					<div className="bg-gray-700 p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold mb-2">
							{isEnglish
								? 'Usage & Importance'
								: 'Imikoreshereze nakamaro'}
						</h2>
						<p className="text-gray-300">
							{isEnglish
								? artifact.usage_en
								: artifact.usage_kin}
						</p>
					</div>
				</div>

				<h2 className="text-2xl font-semibold mt-10 mb-4">
					{isEnglish
						? 'User Reviews'
						: 'Ibitekerezo byabakoresha'}
				</h2>
				<div className="space-y-4">
					{ratings?.length > 0 ? (
						ratings?.map((review, index) => (
							<div
								key={index}
								className="bg-[#444] p-4 rounded-lg shadow-md"
							>
								<p className="text-lg font-semibold text-[#E25822]">
									{review?.user?.fname}
								</p>
								<p className="text-gray-300">
									{review?.message}
								</p>
								{renderStars(review.rating)}
							</div>
						))
					) : (
						<div className="text-center text-gray-200">
							No review yet, be the first to rate the
							experience
						</div>
					)}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ArtifactPage;
