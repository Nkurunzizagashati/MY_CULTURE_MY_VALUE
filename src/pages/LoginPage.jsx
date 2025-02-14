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
		<div>
			<Navbar />
			<ToastContainer position="top-right" autoClose={3000} />
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
					<h2 className="text-2xl font-semibold text-gray-800 text-center">
						Login
					</h2>

					<form className="mt-6" onSubmit={handleLogin}>
						{/* Email Field */}
						<div className="mb-4">
							<label className="block text-gray-600 text-sm font-medium mb-2">
								Email
							</label>
							<input
								type="email"
								name="email"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Password Field */}
						<div className="mb-4">
							<label className="block text-gray-600 text-sm font-medium mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								placeholder="Enter your password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Login Button */}
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
							disabled={status === 'loading'}
						>
							{status === 'loading'
								? 'Logging in...'
								: 'Login'}
						</button>
					</form>

					{/* Link to Register */}
					<p className="mt-4 text-center text-gray-600 text-sm">
						Don&apos;t have an account?{' '}
						<NavLink
							to="/register"
							className="text-blue-600 hover:underline"
						>
							Register
						</NavLink>
					</p>
				</div>
			</div>
		</div>
	);
}
