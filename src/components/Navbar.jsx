import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
	const [user, setUser] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
		setIsMenuOpen(false);
	};

	return (
		<nav className="bg-[#2C2C2C] text-white p-4 md:p-6 flex justify-between items-center shadow-lg fixed w-full top-0 z-50">
			<NavLink to="/">
				<h1 className="text-2xl font-bold">MyCultureMyValue</h1>
			</NavLink>

			{/* Mobile Menu Button */}
			<button
				className="md:hidden text-white"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
				{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
			</button>

			{/* Desktop Menu */}
			<ul className="hidden md:flex space-x-6 items-center">
				<li>
					<NavLink
						to="/artifacts"
						className={({ isActive }) =>
							`text-xl transition-colors font-bold ${
								isActive
									? 'text-[#E25822]'
									: 'hover:text-[#E25822]'
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
								`text-xl transition-colors font-bold ${
									isActive
										? 'text-[#E25822]'
										: 'hover:text-[#E25822]'
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
							<div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
								{user.firstName?.[0] || 'U'}
								{user.lastName?.[0] || ''}
							</div>
						</button>

						{/* Dropdown Menu */}
						<ul className="absolute right-0 mt-2 bg-white text-black shadow-lg hidden group-hover:block w-36 rounded-lg overflow-hidden">
							<li className="p-3 border-b text-center font-medium">
								{user.lastName || 'User'}
							</li>
							<li>
								<button
									className="p-3 w-full text-left hover:bg-gray-200 transition"
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
							className={({ isActive }) =>
								`text-xl transition-colors font-bold ${
									isActive
										? 'text-[#E25822]'
										: 'hover:text-[#E25822]'
								}`
							}
						>
							Login
						</NavLink>
					</li>
				)}
			</ul>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<ul className="absolute top-16 left-0 w-full bg-[#2C2C2C] text-white flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
					<li>
						<NavLink
							to="/artifacts"
							className={({ isActive }) =>
								`text-xl transition-colors font-bold ${
									isActive
										? 'text-[#E25822]'
										: 'hover:text-[#E25822]'
								}`
							}
							onClick={() => setIsMenuOpen(false)}
						>
							Artifacts
						</NavLink>
					</li>

					{user && (
						<li>
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									`text-xl transition-colors font-bold ${
										isActive
											? 'text-[#E25822]'
											: 'hover:text-[#E25822]'
									}`
								}
								onClick={() => setIsMenuOpen(false)}
							>
								Dashboard
							</NavLink>
						</li>
					)}

					{user ? (
						<li>
							<button
								className="text-xl font-bold hover:text-[#E25822] transition"
								onClick={logoutUser}
							>
								Logout
							</button>
						</li>
					) : (
						<li>
							<NavLink
								to="/login"
								className={({ isActive }) =>
									`text-xl transition-colors font-bold ${
										isActive
											? 'text-[#E25822]'
											: 'hover:text-[#E25822]'
									}`
								}
								onClick={() => setIsMenuOpen(false)}
							>
								Login
							</NavLink>
						</li>
					)}
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
