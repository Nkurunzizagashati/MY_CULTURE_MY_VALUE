import { useState } from 'react';
import Card from '../customComponents/Card';
import { Search, Edit, Trash } from 'lucide-react';
import Navbar from '../components/Navbar';

const usersData = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		role: 'Admin',
		status: 'Active',
	},
	{
		id: 2,
		name: 'Sarah Smith',
		email: 'sarah@example.com',
		role: 'User',
		status: 'Inactive',
	},
	{
		id: 3,
		name: 'Michael Brown',
		email: 'michael@example.com',
		role: 'Moderator',
		status: 'Active',
	},
];

export default function UsersPage() {
	const [users, setUsers] = useState(usersData);
	const [search, setSearch] = useState('');

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(search.toLowerCase()) ||
			user.email.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div>
			<Navbar />
			<div className="p-6">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Users
				</h2>

				{/* Search Bar */}
				<div className="mb-4 flex items-center border p-2 rounded-md">
					<Search className="text-gray-500 mr-2" size={20} />
					<input
						type="text"
						placeholder="Search users..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full outline-none"
					/>
				</div>

				{/* Users List */}
				<Card title="User List">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="border-b">
								<th className="p-3">Name</th>
								<th className="p-3">Email</th>
								<th className="p-3">Role</th>
								<th className="p-3">Status</th>
								<th className="p-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredUsers.map((user) => (
								<tr key={user.id} className="border-b">
									<td className="p-3">{user.name}</td>
									<td className="p-3">
										{user.email}
									</td>
									<td className="p-3">{user.role}</td>
									<td
										className={`p-3 ${
											user.status === 'Active'
												? 'text-green-600'
												: 'text-red-600'
										}`}
									>
										{user.status}
									</td>
									<td className="p-3 flex space-x-3">
										<Edit className="text-blue-600 cursor-pointer" />
										<Trash className="text-red-600 cursor-pointer" />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Card>
			</div>
		</div>
	);
}
