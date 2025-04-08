// import PropTypes from 'prop-types';

// const ReviewBox = ({
// 	rating,
// 	setRating,
// 	reviewMessage,
// 	setReviewMessage,
// 	onClose,
// 	onSubmit,
// }) => {
// 	return (
// 		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// 			<div className="bg-[#2C2C2C] p-6 rounded-lg shadow-lg w-96 text-white">
// 				<h2 className="text-xl font-semibold mb-4">
// 					Add a Review
// 				</h2>

// 				{/* Rating Input */}
// 				<label className="block mb-2">Rating (1 - 5)</label>
// 				<input
// 					required
// 					type="number"
// 					step="0.1"
// 					min="1"
// 					max="5"
// 					value={rating}
// 					onChange={(e) => {
// 						let value = e.target.value;

// 						// Regex to allow 1.0 - 4.9 (with up to one decimal) or exactly 5.0
// 						if (
// 							/^(1|2|3|4)(\.\d{0,1})?$|^5(\.0{0,1})?$/.test(
// 								value
// 							) ||
// 							value === ''
// 						) {
// 							setRating(value);
// 						}
// 					}}
// 					className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// 				/>

// 				{/* Review Message */}
// 				<label className="block mt-4 mb-2">Your Message</label>
// 				<textarea
// 					required
// 					value={reviewMessage}
// 					onChange={(e) => setReviewMessage(e.target.value)}
// 					className="w-full p-2 h-24 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// 				></textarea>

// 				{/* Buttons */}
// 				<div className="mt-4 flex justify-between">
// 					<button
// 						onClick={onSubmit}
// 						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
// 					>
// 						Add Review
// 					</button>
// 					<button
// 						onClick={onClose}
// 						className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
// 					>
// 						Close
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// // ✅ **Prop Type Validation**
// ReviewBox.propTypes = {
// 	rating: PropTypes.number.isRequired,
// 	setRating: PropTypes.func.isRequired,
// 	reviewMessage: PropTypes.string.isRequired,
// 	setReviewMessage: PropTypes.func.isRequired,
// 	onClose: PropTypes.func.isRequired,
// 	onSubmit: PropTypes.func.isRequired,
// };

// export default ReviewBox;

import PropTypes from 'prop-types';

const ReviewBox = ({
	rating,
	setRating,
	reviewMessage,
	setReviewMessage,
	onClose,
	onSubmit,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-[#2C2C2C] p-6 rounded-lg shadow-lg w-96 text-white">
				<h2 className="text-xl font-semibold mb-4">
					Add a Review
				</h2>

				<form onSubmit={handleSubmit}>
					{/* Rating Input */}
					<label className="block mb-2">Rating (1 - 5)</label>
					<input
						required
						type="number"
						step="0.1"
						min="1"
						max="5"
						value={rating}
						onChange={(e) => {
							let value = e.target.value;
							if (
								/^(1|2|3|4)(\.\d{0,1})?$|^5(\.0{0,1})?$/.test(
									value
								) ||
								value === ''
							) {
								setRating(value);
							}
						}}
						className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					{/* Review Message */}
					<label className="block mt-4 mb-2">
						Your Message
					</label>
					<textarea
						required
						value={reviewMessage}
						onChange={(e) =>
							setReviewMessage(e.target.value)
						}
						className="w-full p-2 h-24 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					></textarea>

					{/* Buttons */}
					<div className="mt-4 flex justify-between">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
						>
							Add Review
						</button>
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// ✅ **Prop Type Validation**
ReviewBox.propTypes = {
	rating: PropTypes.number.isRequired,
	setRating: PropTypes.func.isRequired,
	reviewMessage: PropTypes.string.isRequired,
	setReviewMessage: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default ReviewBox;
