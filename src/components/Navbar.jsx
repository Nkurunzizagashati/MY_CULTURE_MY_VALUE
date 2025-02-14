import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (error) {
				console.error('Error parsing user data:', error);
			}
		}
	}, []);

	const logoutUser = () => {
		localStorage.removeItem('user');
		setUser(null);
	};

	return (
		<nav className="bg-[#2E4D36] text-white p-6 flex justify-between items-center shadow-lg fixed top-0 left-0 right-0 z-50">
			<NavLink to="/">
				<h1 className="text-2xl font-bold">
					Rwanda AR Heritage
				</h1>
			</NavLink>
			<ul className="hidden md:flex space-x-6">
				<li>
					<NavLink
						to="/artifacts"
						className={({ isActive }) =>
							`text-xl transition-colors ${
								isActive
									? 'text-[#C2923E]'
									: 'hover:text-[#C2923E]'
							}`
						}
					>
						Artifacts
					</NavLink>
				</li>

				{user && (
					<li>
						<NavLink
							to="/dashboard"
							className={({ isActive }) =>
								`text-xl transition-colors ${
									isActive
										? 'text-[#C2923E]'
										: 'hover:text-[#C2923E]'
								}`
							}
						>
							Dashboard
						</NavLink>
					</li>
				)}

				{user ? (
					<li className="relative group">
						<button className="flex items-center space-x-2">
							<div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center">
								{user.firstName?.[0] || 'U'}
								{user.lastName?.[0] || ''}
							</div>
						</button>
						<ul className="absolute right-0 bg-white text-black shadow-md hidden group-hover:block w-32 rounded-lg">
							<li className="p-2 border-b">
								{user.lastName || 'User'}
							</li>
							<li>
								<button
									className="p-2 w-full text-left hover:bg-gray-200"
									onClick={logoutUser}
								>
									Logout
								</button>
							</li>
						</ul>
					</li>
				) : (
					<li>
						<NavLink
							to="/login"
							className="text-xl hover:text-[#C2923E]"
						>
							Login
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
