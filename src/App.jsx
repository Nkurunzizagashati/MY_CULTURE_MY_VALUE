import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtfactsPage from './pages/ArtfactsPage';
import ARViewer from './pages/ARViewer';
import Dashboard from './pages/Dashboard';
import UploadsPage from './pages/UploadsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
		},
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
	]);
	return <RouterProvider router={router} />;
}

export default App;
