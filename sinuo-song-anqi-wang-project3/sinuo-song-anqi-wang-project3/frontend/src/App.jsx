import { useState } from 'react'
import axios from 'axios'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import HomePage from './HomePage';
import Navbar from './Navbar';
import Login from './Login';
import CreateUser from './CreateUser';
import Profile from './Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path = "/" element = {<HomePage/>}/>
      <Route path = "/login" element={<Login/>} />
      <Route path = "/register" element={<CreateUser/>} />
      <Route path = "/profile/:username" element={<Profile/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;