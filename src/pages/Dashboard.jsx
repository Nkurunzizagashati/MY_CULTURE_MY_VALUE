// import Card from '../customComponents/Card';
// import {
// 	BarChart,
// 	Bar,
// 	XAxis,
// 	YAxis,
// 	Tooltip,
// 	ResponsiveContainer,
// } from 'recharts';
// import { Upload, Users, Mail } from 'lucide-react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { useEffect, useState } from 'react';

// const Dashboard = () => {
// 	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
// 	const navigate = useNavigate();

// 	const stats = {
// 		users: 130,
// 		subscribers: 76,
// 		artifacts: 24,
// 		newsletters: 12,
// 		reviews: 58,
// 		highestRatedArtifact: { name: 'Inanga', rating: 4.9 },
// 		lowestRatedArtifact: { name: 'Traditional Pot', rating: 2.1 },
// 	};

// 	const barData = [
// 		{ name: 'Users', count: stats.users },
// 		{ name: 'Subscribers', count: stats.subscribers },
// 	];

// 	useEffect(() => {
// 		const handleResize = () => setScreenWidth(window.innerWidth);
// 		window.addEventListener('resize', handleResize);

// 		if (screenWidth < 1024) {
// 			navigate('/');
// 		}

// 		return () => window.removeEventListener('resize', handleResize);
// 	}, [screenWidth, navigate]);

// 	return (
// 		<div>
// 			<Navbar />
// 			<div className="flex h-screen bg-[#2C2C2C] mt-20 text-white">
// 				{/* Sidebar */}
// 				<div className="w-64 bg-[#2C2C2C] shadow-r-lg border-r-2 p-5 fixed h-full">
// 					<div className="space-y-4 pt-8 ml-4">
// 						<NavLink
// 							to="/uploads"
// 							className="flex items-center text-white hover:text-green-500 cursor-pointer"
// 						>
// 							<Upload className="mr-2" /> Uploads
// 						</NavLink>
// 						<NavLink
// 							to="/subscribers"
// 							className="flex items-center text-white hover:text-green-500 cursor-pointer"
// 						>
// 							<Users className="mr-2" /> Subscribers
// 						</NavLink>
// 						<NavLink
// 							to="/users"
// 							className="flex items-center text-white hover:text-green-500 cursor-pointer"
// 						>
// 							<Users className="mr-2" /> Users
// 						</NavLink>
// 						<NavLink
// 							to="/newsletters"
// 							className="flex items-center text-white hover:text-green-500 cursor-pointer"
// 						>
// 							<Mail className="mr-2" /> Newsletters
// 						</NavLink>
// 					</div>
// 				</div>

// 				<div className="flex-1 p-6 ml-64">
// 					<div className="grid grid-cols-5 gap-6 mt-8">
// 						<Card title="Users">
// 							<p className="text-2xl font-semibold text-green-500">
// 								{stats.users}
// 							</p>
// 						</Card>
// 						<Card title="Subscribers">
// 							<p className="text-2xl font-semibold text-green-500">
// 								{stats.subscribers}
// 							</p>
// 						</Card>
// 						<Card title="Artifacts">
// 							<p className="text-2xl font-semibold text-green-500">
// 								{stats.artifacts}
// 							</p>
// 						</Card>
// 						<Card title="Newsletters">
// 							<p className="text-2xl font-semibold text-green-500">
// 								{stats.newsletters}
// 							</p>
// 						</Card>
// 						<Card title="Reviews">
// 							<p className="text-2xl font-semibold text-green-500">
// 								{stats.reviews}
// 							</p>
// 						</Card>
// 					</div>

// 					<div className="mt-8 grid grid-cols-2 gap-6">
// 						<Card title="User vs Subscriber Ratio">
// 							<ResponsiveContainer
// 								width="100%"
// 								height={200}
// 							>
// 								<BarChart data={barData}>
// 									<XAxis dataKey="name" />
// 									<YAxis />
// 									<Tooltip />
// 									<Bar
// 										dataKey="count"
// 										fill="#4F46E5"
// 										radius={[5, 5, 0, 0]}
// 									/>
// 								</BarChart>
// 							</ResponsiveContainer>
// 						</Card>

// 						<Card title="Artifact Ratings">
// 							<p className="text-lg">
// 								Highest Rated:{' '}
// 								{stats.highestRatedArtifact.name} (
// 								{stats.highestRatedArtifact.rating})
// 							</p>
// 							<p className="text-lg mt-4">
// 								Lowest Rated:{' '}
// 								{stats.lowestRatedArtifact.name} (
// 								{stats.lowestRatedArtifact.rating})
// 							</p>
// 						</Card>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Dashboard;

import Card from '../customComponents/Card';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { Upload, Users, Mail } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtifacts } from '../redux/artifactSlice';
import { fetchSubscribers } from '../redux/subscriberSlice';
import { fetchUsers } from '../redux/userSlice';

const Dashboard = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Get data from Redux store
	const artifacts = useSelector((state) => state?.artifacts?.items);
	const artifactStatus = useSelector(
		(state) => state.artifacts.status
	);
	const subscribers = useSelector(
		(state) => state?.subscribers?.items?.subscribers || []
	);
	const users = useSelector(
		(state) => state?.users?.users?.users || []
	);
	const newsletters = useSelector(
		(state) => state?.newsletters?.items || []
	);
	const reviews = useSelector(
		(state) => state?.ratings?.items?.reviews || []
	);

	// Fetch data when component mounts
	useEffect(() => {
		if (artifactStatus === 'idle') {
			dispatch(fetchArtifacts());
		}
		dispatch(fetchSubscribers());
		dispatch(fetchUsers());
	}, [dispatch, artifactStatus]);

	// Calculate stats dynamically
	const stats = {
		users: users.length,
		subscribers: subscribers.length,
		artifacts: artifacts.length,
		newsletters: newsletters.length,
		reviews: reviews.length,
		highestRatedArtifact:
			artifacts.length > 0
				? artifacts.reduce(
						(max, artifact) =>
							artifact.rating > max.rating
								? artifact
								: max,
						artifacts[0]
				  )
				: { name: 'N/A', rating: 0 },
		lowestRatedArtifact:
			artifacts.length > 0
				? artifacts.reduce(
						(min, artifact) =>
							artifact.rating < min.rating
								? artifact
								: min,
						artifacts[0]
				  )
				: { name: 'N/A', rating: 0 },
	};

	const barData = [
		{ name: 'Users', count: stats.users },
		{ name: 'Subscribers', count: stats.subscribers },
	];

	useEffect(() => {
		const handleResize = () => setScreenWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);

		if (screenWidth < 1024) {
			navigate('/');
		}

		return () => window.removeEventListener('resize', handleResize);
	}, [screenWidth, navigate]);

	console.log(
		'HIGHEST RATED ARTIFACT: ',
		stats.highestRatedArtifact.title_en
	);

	return (
		<div>
			<Navbar />
			<div className="flex h-screen bg-[#2C2C2C] mt-20 text-white">
				<div className="w-64 bg-[#2C2C2C] shadow-r-lg border-r-2 p-5 fixed h-full">
					<div className="space-y-4 pt-8 ml-4">
						<NavLink
							to="/uploads"
							className="flex items-center text-white hover:text-green-500 cursor-pointer"
						>
							<Upload className="mr-2" /> Uploads
						</NavLink>
						<NavLink
							to="/subscribers"
							className="flex items-center text-white hover:text-green-500 cursor-pointer"
						>
							<Users className="mr-2" /> Subscribers
						</NavLink>
						<NavLink
							to="/users"
							className="flex items-center text-white hover:text-green-500 cursor-pointer"
						>
							<Users className="mr-2" /> Users
						</NavLink>
						<NavLink
							to="/newsletters"
							className="flex items-center text-white hover:text-green-500 cursor-pointer"
						>
							<Mail className="mr-2" /> Newsletters
						</NavLink>
					</div>
				</div>
				<div className="flex-1 p-6 ml-64">
					<div className="grid grid-cols-5 gap-6 mt-8">
						<Card title="Users">
							<p className="text-2xl font-semibold text-green-500">
								{stats.users}
							</p>
						</Card>
						<Card title="Subscribers">
							<p className="text-2xl font-semibold text-green-500">
								{stats.subscribers}
							</p>
						</Card>
						<Card title="Artifacts">
							<p className="text-2xl font-semibold text-green-500">
								{stats.artifacts}
							</p>
						</Card>
						<Card title="Newsletters">
							<p className="text-2xl font-semibold text-green-500">
								{stats.newsletters}
							</p>
						</Card>
						<Card title="Reviews">
							<p className="text-2xl font-semibold text-green-500">
								{stats.reviews}
							</p>
						</Card>
					</div>
					<div className="mt-8 grid grid-cols-2 gap-6">
						<Card title="User vs Subscriber Ratio">
							<ResponsiveContainer
								width="100%"
								height={200}
							>
								<BarChart data={barData}>
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Bar
										dataKey="count"
										fill="#4F46E5"
										radius={[5, 5, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</Card>
						<Card title="Artifact Ratings">
							<p className="text-lg">
								Highest Rated:{' '}
								{stats.highestRatedArtifact.title_en}
							</p>
							<p className="text-lg mt-4">
								Lowest Rated:{' '}
								{stats.lowestRatedArtifact.title_en}
							</p>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
