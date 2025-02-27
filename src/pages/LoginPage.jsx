import Navbar from '../components/Navbar';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.users);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(loginUser(formData)).then((result) => {
			if (result.meta.requestStatus === 'fulfilled') {
				toast.success('Login successful! Redirecting...');
				setTimeout(() => navigate('/dashboard'), 2000);
			} else {
				toast.error(error || 'Invalid email or password!');
			}
		});
	};

	return (
		<div
			className="min-h-screen bg-cover bg-center flex flex-col"
			style={{ backgroundImage: `url('/akagera.jpg')` }}
		>
			<Navbar />
			<ToastContainer position="top-right" autoClose={3000} />

			<div className="flex-grow flex items-center justify-center p-4">
				<div className="w-full max-w-md bg-opacity-30 bg-[#2C2C2C] p-8 rounded-lg shadow-lg backdrop-blur-md">
					<h2 className="text-2xl font-semibold text-white text-center">
						Login
					</h2>

					<form className="mt-6" onSubmit={handleLogin}>
						<div className="mb-4">
							<label className="block text-gray-300 text-sm font-medium mb-2">
								Email
							</label>
							<input
								type="email"
								name="email"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-300 text-sm font-medium mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white placeholder-gray-400"
								placeholder="Enter your password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-[#E25822] text-white py-2 rounded-md hover:bg-yellow-600 transition font-semibold"
							disabled={status === 'loading'}
						>
							{status === 'loading'
								? 'Logging in...'
								: 'Login'}
						</button>
					</form>

					<p className="mt-4 text-center text-gray-300 text-sm">
						Don&apos;t have an account?{' '}
						<NavLink
							to="/register"
							className="text-[#E25822] hover:underline"
						>
							Register
						</NavLink>
					</p>
				</div>
			</div>
		</div>
	);
}
