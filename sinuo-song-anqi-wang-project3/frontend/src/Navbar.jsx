import React from 'react'
import { useNavigate } from 'react-router'
import Login from './Login'


export default function () {
  const navigate = useNavigate();
  function handleHomeClick(){
    navigate("/")
  };

  function handleLoginClick(){
    navigate("/login")
  };

  function handleSignUpClick(){
    navigate("/signup")
  };

  return (
    <div className="centered">
      <div className = "navBar">
        <button className="my-button" onClick={handleHomeClick}>Home</button>
        <button className="my-button" onClick={handleLoginClick}>Log In</button>
        <button className="my-button" onClick={handleSignUpClick}>Sign Up</button>
      </div>
    </div>
  )
}