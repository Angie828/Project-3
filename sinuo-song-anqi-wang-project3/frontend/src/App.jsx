import { useState } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar";
import { createContext } from "react";
import Login from "./Login";
import CreateUser from "./CreateUser";
import HomePage from "./HomePage";
import Profile from "./Profile";

export const UserContext = createContext({
  activeUsername: "",
  setActiveUsername: () => {},
});

function App() {
  const [activeUsername, setActiveUsername] = useState("");
  async function checkIfUserIsLoggedIn() {
    const response = await axios.get("/api/users/isLoggedIn");
    setActiveUsername(response.data.username);
  }

  return (
    <UserContext.Provider
      value={{ activeUsername, setActiveUsername, checkIfUserIsLoggedIn }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateUser />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
