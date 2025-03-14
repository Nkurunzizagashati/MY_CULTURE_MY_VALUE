import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
	const [status, setStatus] = useState('loading');
	const [message, setMessage] = useState('');
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	useEffect(() => {
		if (!token) {
			setStatus('invalid');
			return;
		}

		axios
			.post('http://localhost:3002/api/users/verify', { token })
			.then((response) => {
				setStatus('success');
				setMessage(response.data.message);
			})
			.catch((error) => {
				const errorMessage = error.response
					? error.response.data.message
					: 'Something went wrong';
				if (errorMessage.includes('expired')) {
					setStatus('expired');
					setMessage(errorMessage);
				} else {
					setStatus('error');
					setMessage(
						'Verification failed. Please try again.'
					);
				}
			});
	}, [token]);

	return (
		<div>
			<section className="py-28 px-6 min-h-[100vh] bg-[#2C2C2C] flex items-center justify-center">
				<div className="text-center p-6 bg-white shadow-lg rounded-md max-w-xl mx-auto">
					<h2 className="text-3xl font-bold mb-6 text-[#333]">
						Account Verification
					</h2>
					{status === 'loading' && (
						<p>Verifying your account...</p>
					)}
					{status === 'success' && (
						<>
							<p className="text-green-600 mb-4">
								{message ||
									'Account verified successfully! You can now log in.'}
							</p>
							<Link to="/login">
								<button className="w-full py-2 bg-[#D86F45] text-white font-semibold rounded-lg shadow-md hover:bg-[#C2923E]">
									Go to Login
								</button>
							</Link>
						</>
					)}
					{status === 'expired' && (
						<p className="text-yellow-600">{message}</p>
					)}
					{status === 'error' && (
						<p className="text-red-600">{message}</p>
					)}
					{status === 'invalid' && (
						<p className="text-red-600">
							Invalid verification link.
						</p>
					)}
				</div>
			</section>
		</div>
	);
};

export default VerifyAccount;
