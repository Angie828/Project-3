import { useNavigate } from "react-router";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./App";

export default function () {
  const navigate = useNavigate();
  const { activeUsername, setActiveUsername, checkIfUserIsLoggedIn } =
    useContext(UserContext);

  // const [activeUsername, setActiveUsername] = useState(null)
  const [post, setPost] = useState("");
  const [postError, setPostError] = useState("");

  function setNewPost(event) {
    const post = event.target.value;
    setPost(post);
  }

  async function submitPost() {
    try {
      const response = await axios.post("/api/posts/create", { content: post });
      setPost("");
      window.location.reload(false);
    } catch (e) {
      console.log(e);
      setPostError(e.response);
    }
    console.log(post);
  }

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  async function logOutUser() {
    await axios.post("/api/users/logOut");
    setActiveUsername(null);
  }

  const postArea = (
    <form className="d-flex input-group w-50 px-3">
      <input
        type="search"
        className="form-control"
        placeholder="New post"
        aria-label="Search"
        value={post}
        onInput={setNewPost}
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
  );

  const LogoutComponent = (
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
  );

  const loggedinComponent = (
    <div className="d-flex align-items-center">
      <span className="navbar-text px-3">Welcome, {activeUsername}</span>
      <a className="nav-link" onClick={logOutUser}>
        <button type="button" className="btn btn-primary me-3">
          Log out
        </button>
      </a>
    </div>
  );

  const logginginPostComponent = activeUsername ? postArea : null;

  const loggingComponent = activeUsername ? loggedinComponent : LogoutComponent;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
                <a className="nav-link" href="/">
                  TwitBird
                </a>
              </li>
            </ul>
            {logginginPostComponent}
            {loggingComponent}
          </div>
        </div>
      </nav>
    </div>
  );
}
