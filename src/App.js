import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/home/Home';
import Sessions from './components/sessions/Sessions';

// create 2 basic routes
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/ubq6nqwo4nd7a3infg', element: <Sessions /> },
]);

function App() {
  return (
    // Load the routes using react-router-dom
    <RouterProvider router={router} />
  );
}

export default App;
