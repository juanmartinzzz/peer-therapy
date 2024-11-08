import './App.css';
import auth from './data/auth';
import Home from './components/home/Home';
import Sessions from './components/sessions/Sessions';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// create 2 basic routes
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/ubq6nqwo4nd7a3infg', element: <Sessions /> },
]);

function App() {
  // auth.getUser();

  return (
    // Load the routes using react-router-dom
    <RouterProvider router={router} />
  );
}

export default App;
