import Navbar from '../components/Navbar';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.users);

	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleRegister = (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match!');
			return;
		}

		dispatch(
			registerUser({
				fname: formData.fname,
				lname: formData.lname,
				email: formData.email,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			})
		).then((result) => {
			if (result.meta.requestStatus === 'fulfilled') {
				toast.success(
					'Registration successful! Redirecting...'
				);
				setTimeout(() => navigate('/'), 2000);
			} else {
				toast.error(error || 'Registration failed!');
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
						Create an Account
					</h2>

					<form className="mt-6" onSubmit={handleRegister}>
						{/* First Name */}
						<div className="mb-4">
							<label className="block text-gray-600 text-sm font-medium mb-2">
								First Name
							</label>
							<input
								type="text"
								name="fname"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								placeholder="Enter your first name"
								value={formData.fname}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Last Name */}
						<div className="mb-4">
							<label className="block text-gray-600 text-sm font-medium mb-2">
								Last Name
							</label>
							<input
								type="text"
								name="lname"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								placeholder="Enter your last name"
								value={formData.lname}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Email */}
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

						{/* Password */}
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

						{/* Confirm Password */}
						<div className="mb-4">
							<label className="block text-gray-600 text-sm font-medium mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								placeholder="Confirm your password"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Register Button */}
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
							disabled={status === 'loading'}
						>
							{status === 'loading'
								? 'Registering...'
								: 'Register'}
						</button>
					</form>

					{/* Link to Login */}
					<p className="mt-4 text-center text-gray-600 text-sm">
						Already have an account?{' '}
						<NavLink
							to="/login"
							className="text-blue-600 hover:underline"
						>
							Log in
						</NavLink>
					</p>
				</div>
			</div>
		</div>
	);
}
