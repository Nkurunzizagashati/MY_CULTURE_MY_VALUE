const Navbar = () => {
	return (
		<nav className="bg-[#2E4D36] text-white p-4 flex justify-between items-center shadow-lg fixed top-0 left-0 right-0">
			<h1 className="text-2xl font-bold">Rwanda AR Heritage</h1>
			<ul className="hidden md:flex space-x-6">
				<li>
					<a
						href="#artifacts"
						className="hover:text-[#C2923E]"
					>
						Artifacts
					</a>
				</li>
				<li>
					<a href="#about" className="hover:text-[#C2923E]">
						About
					</a>
				</li>
				<li>
					<a href="#contact" className="hover:text-[#C2923E]">
						Contact
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
