import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArtfactsPage from './pages/ArtfactsPage';
import ARViewer from './pages/ARViewer';
import Dashboard from './pages/Dashboard';
import { Upload } from 'lucide-react';

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
			element: <Upload />,
		},
	]);
	return <RouterProvider router={router} />;
}

export default App;
