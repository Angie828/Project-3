import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CreateUser from './CreateUser'
import Navbar from './Navbar'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from './Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)