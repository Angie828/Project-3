import { useNavigate } from 'react-router'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function () {
  const navigate = useNavigate();

  const [activeUsername, setActiveUsername] = useState(null)
  const [postDate, setPostDate] = useState('');
  const [post, setPost] = useState('')
  const [postError, setPostError] = useState('')

  function setNewPost(event) {
    const post = event.target.value;
    setPost(post);
  }

  function setNewPostDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setPostDate(formattedDate);
  }

  async function checkIfUserIsLoggedIn() {
      const response = await axios.get('/api/users/isLoggedIn')

      setActiveUsername(response.data.username)
  }

  async function submitPost() {
    try {
        const response = await axios.post('/api/posts/', {content: post})
        setPost('');
    } catch (e) {
        console.log(e)
        setPostError(e.response)
    }
    console.log(post);
  }


  const postArea = 
  <form className="d-flex input-group w-auto">
    <input
      type="search"
      className="form-control"
      placeholder="New post"
      aria-label="Search"
      value = {post}
      onInput = {setNewPost}
    />
    <button
      className="btn btn-outline-primary"
      type="button"
      data-mdb-ripple-color="dark"
      onClick={submitPost}
    >
      Post
    </button>
  </form>

  useEffect(() => {
      checkIfUserIsLoggedIn()
  }, []);

  async function logOutUser() {
      await axios.post('/api/users/logOut')
      setActiveUsername(null)
  }

  const LogoutComponent = 
  <div className="d-flex align-items-center">
    <a className="nav-link" href="/login">
      <button type="button" className="btn btn-link px-3 me-2">
        Log In
      </button>
    </a>
    <a className="nav-link" href="/register">
      <button type="button" className="btn btn-primary me-3">
        Sign up
      </button>
    </a>
  </div>

  const loggedinComponent = 
  <div className="d-flex align-items-center">
    <span className="navbar-text">
      Welcome, {activeUsername}
    </span>
    <a className="nav-link" onClick={logOutUser}>
      <button type="button" className="btn btn-primary me-3">
        Log out
      </button>
    </a>
  </div>

  const logginginPostComponent = activeUsername ? postArea : null;


  const loggingComponent = activeUsername ? loggedinComponent : LogoutComponent;

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
          </ul>
          {logginginPostComponent}
          {loggingComponent}
        </div>
      </div>
    </nav>
    
    </div>
  )
}