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
import { useDispatch } from 'react-redux';
import { fetchArtifacts } from './redux/artifactSlice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchArtifacts());
	}, [dispatch]);

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
	]);
	return <RouterProvider router={router} />;
}

export default App;
