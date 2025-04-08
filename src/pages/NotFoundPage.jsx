import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-[#2C2C2C] text-gray-100">
			<h1 className="text-6xl font-bold text-red-500">404</h1>
			<p className="text-xl mt-2">
				Oops! The page you&apos;re looking for doesn&apos;t
				exist.
			</p>
			<Link
				to="/"
				className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300"
			>
				Go Back Home
			</Link>
		</div>
	);
};

export default NotFoundPage;
