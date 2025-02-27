import PropTypes from 'prop-types';

const Card = ({
	className,
	title,
	description,
	children,
	footer,
	...props
}) => {
	return (
		<div
			className={`rounded-xl border shadow p-4 ${
				className || ''
			}`}
			{...props}
		>
			{/* Header */}
			{title && (
				<div className="border-b pb-2 mb-3">
					<h2 className="text-xl font-semibold">{title}</h2>
					{description && (
						<p className="text-gray-500 text-sm">
							{description}
						</p>
					)}
				</div>
			)}

			{/* Content */}
			<div className="mb-3">{children}</div>

			{/* Footer */}
			{footer && (
				<div className="border-t pt-2 mt-3">{footer}</div>
			)}
		</div>
	);
};

Card.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	children: PropTypes.node.isRequired,
	footer: PropTypes.node,
};

export default Card;
