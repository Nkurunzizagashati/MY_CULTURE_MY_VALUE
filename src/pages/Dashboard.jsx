import Card from '../customComponents/Card';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { Home, Upload, Users, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

const data = [
	{ name: 'Models', count: 24 },
	{ name: 'Users', count: 130 },
	{ name: 'Uploads', count: 58 },
];

export default function Dashboard() {
	return (
		<div>
			<Navbar />
			<div className="flex h-screen bg-gray-100 mt-20">
				{/* Sidebar */}
				<div className="w-64 bg-white shadow-lg p-5">
					<h1 className="text-xl font-bold text-gray-800 mb-6">
						Dashboard
					</h1>
					<div className="space-y-4">
						<NavLink
							to="/"
							className="flex items-center text-gray-700 hover:text-green-500 cursor-pointer"
						>
							<Home className="mr-2" /> Home
						</NavLink>
						<NavLink
							to="/users"
							className="flex items-center text-gray-700 hover:text-green-500 cursor-pointer"
						>
							<Users className="mr-2" /> Users
						</NavLink>
						<NavLink
							to="/uploads"
							className="flex items-center text-gray-700 hover:text-green-500 cursor-pointer"
						>
							<Upload className="mr-2" /> Uploads
						</NavLink>
						<NavLink
							to=""
							className="flex items-center text-gray-700 hover:text-green-500 cursor-pointer"
						>
							<Settings className="mr-2" /> Settings
						</NavLink>
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						Overview
					</h2>
					<div className="grid grid-cols-3 gap-6">
						{data.map((item) => (
							<Card key={item.name} title={item.name}>
								<p className="text-2xl font-semibold text-green-500">
									{item.count}
								</p>
							</Card>
						))}
					</div>

					{/* Recent Activity & Chart */}
					<div className="mt-8 grid grid-cols-2 gap-6">
						<Card title="Recent Activity">
							<ul className="text-gray-600 space-y-2">
								<li>User John uploaded a new model.</li>
								<li>Admin approved an artifact.</li>
								<li>New user Sarah joined.</li>
							</ul>
						</Card>

						<Card title="Statistics">
							<ResponsiveContainer
								width="100%"
								height={200}
							>
								<BarChart data={data}>
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
					</div>
				</div>
			</div>
		</div>
	);
}
