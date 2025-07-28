import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Card from './Components/Card/Card';
import Product from './Components/Card/Product';
import Layout from './Components/Card/Layout';
import Login from './Components/Card/login/Login';
import Register from './Components/Card/register/Register';

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  function toggletheme() {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }

  const routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout theme={theme} toggletheme={toggletheme} />,
      children: [
        { index: true, element: <Navigate to="/card" /> },
        { path: 'card', element: <Card /> },
        { path: 'product/:id', element: <Product /> },
        { path: 'login', element: <Login/> },
        { path: 'register', element: <Register/>},

      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
