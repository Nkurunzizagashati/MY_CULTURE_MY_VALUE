import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArtfactsPage from './pages/ArtfactsPage';
import ARViewer from './pages/ARViewer';
import Dashboard from './pages/Dashboard';
import UploadsPage from './pages/UploadsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtifacts } from './redux/artifactSlice';
import ArtifactPage from './pages/ArtifactPage';
import VerifyAccount from './pages/VerifyAccount';
import { useWebSocketUpdates } from './customHooks/websocket';
import { resetChange } from './redux/changeOccurSlice';
import EditArtifactPage from './pages/EditArtifactPage';
import { fetchRatings } from './redux/ratingSlice';
import NotFoundPage from './pages/NotFoundPage';
import Newsletter from './pages/Newsletter';
import { fetchSubscribers } from './redux/subscriberSlice';
import { fetchNewsletters } from './redux/newsletterSlice';
import { fetchUsers } from './redux/userSlice';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
	const dispatch = useDispatch();
	const changeOccur = useSelector(
		(state) => state.change_occur.value
	);

	useWebSocketUpdates(); // Enable real-time updates

	useEffect(() => {
		if (changeOccur) {
			dispatch(fetchArtifacts());
			dispatch(resetChange());
			dispatch(fetchRatings());
			dispatch(fetchSubscribers());
			dispatch(fetchNewsletters());
			dispatch(fetchUsers());
		}
	}, [changeOccur, dispatch]);

	const router = createBrowserRouter([
		{
			path: '/artifacts',
			element: <ArtfactsPage />,
		},
		{
			path: '/artifacts/ar/:id',
			element: <ARViewer />,
		},
		{
			path: '/dashboard',
			element: <Dashboard />,
		},
		{
			path: '/uploads',
			element: <UploadsPage />,
		},
		{
			path: '/users',
			element: <UsersPage />,
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/register',
			element: <RegisterPage />,
		},
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/artifacts/:id',
			element: <ArtifactPage />,
		},
		{
			path: '/artifact/edit/:id',
			element: <EditArtifactPage />,
		},
		{
			path: '/verify',
			element: <VerifyAccount />,
		},
		{
			path: '/newsletters',
			element: <Newsletter />,
		},
		{
			path: '/terms-conditions',
			element: <TermsAndConditions />,
		},
		{
			path: '*',
			element: <NotFoundPage />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
