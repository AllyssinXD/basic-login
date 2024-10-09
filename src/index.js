import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './app.css'

const router = createBrowserRouter([{
  path: '/login',
  Component: Login
},
{
  path: '/register',
  Component: Register
},
{
  path: '/',
  Component: App
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
