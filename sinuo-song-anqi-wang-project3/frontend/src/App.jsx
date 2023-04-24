import { useState } from 'react'
import axios from 'axios'

import HomePage from './HomePage';
import Navbar from './Navbar';
import Pokemons from './Pokemons';
import Login from './Login';
import CreateUser from './CreateUser';

function App() {
  return (
    <div>
    <Navbar/>
    <Routes>
      <Route path = "/" element = {<HomePage/>}/>
      <Route path = "/login" element={<Login/>} />
      <Route path = "/signup" element={<CreateUser/>} />
      <Route path = "/getPokemons" element={<Pokemons/>} />
    </Routes>
    </div>
  )
}

export default App;