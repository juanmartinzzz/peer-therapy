import './App.css';
import Group from './components/groups/Group';
import Sessions from './components/sessions/Sessions';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// create 2 basic routes
const router = createBrowserRouter([
  { path: '/', element: <Sessions /> },
  { path: '/ubq6nqwo4nd7a3infg', element: <Sessions /> },
  { path: '/group/:sessionId/:groupId', element: <Group /> },
]);

function App() {
  return (
    // Load the routes using react-router-dom
    <RouterProvider router={router} />
  );
}

export default App;
