import './App.css';
import Group from './components/groups/Group';
import Session from './components/sessions/Session';
import Sessions from './components/sessions/Sessions';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// create 2 basic routes
const router = createBrowserRouter([
  { path: '/', element: <Sessions /> },
  { path: '/session/:sessionId', element: <Session /> },
  { path: `/session/:sessionId/${process.env.REACT_APP_ADMIN_HASH}`, element: <Session /> },
  { path: `/${process.env.REACT_APP_ADMIN_HASH}`, element: <Sessions /> },
  { path: '/group/:sessionId/:groupId', element: <Group /> },
]);

function App() {
  return (
    // Load the routes using react-router-dom
    <RouterProvider router={router} />
  );
}

export default App;
