import PropTypes from 'prop-types';

const Button = ({
	className,
	children,
	onClick,
	type = 'button',
	...props
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`px-4 py-2 rounded-md font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
				className || ''
			}`}
			{...props}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
