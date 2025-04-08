import PropTypes from 'prop-types';

const SubscribeModal = ({
	isOpen,
	onClose,
	onConfirm,
	message,
	title,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg shadow-lg text-center">
				<h3 className="text-lg font-semibold mb-4">{title}</h3>
				<p className="text-gray-700 mb-6">{message}</p>
				<div className="flex justify-center gap-4">
					<button
						className="bg-gray-300 px-4 py-2 rounded-lg"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						className="bg-[#E25822] text-white px-4 py-2 rounded-lg"
						onClick={onConfirm}
					>
						Agree & Continue
					</button>
				</div>
			</div>
		</div>
	);
};

SubscribeModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default SubscribeModal;
