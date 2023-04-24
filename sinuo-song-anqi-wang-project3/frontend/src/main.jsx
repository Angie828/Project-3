import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Pokemons from './Pokemons'
import Header from './Header'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import PokemonDetail from './PokemonDetail';
import Login from './Login';

const router = createBrowserRouter([
  {
    path: '/pokemon/:pokemonId',
    element: <PokemonDetail />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Pokemons />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
