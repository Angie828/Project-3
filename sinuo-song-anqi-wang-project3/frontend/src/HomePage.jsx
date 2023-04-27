import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./App";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { activeUsername, setActiveUsername } = useContext(UserContext);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");

  const handleEditClick = (postId, currentContent) => {
    setEditingPostId(postId);
    setIsEditing(true);
    setUpdatedContent(currentContent);
  };

  async function handleSaveClick(postId, updatedContent) {
    const response = await axios.put(`/api/posts/${postId}`, {
      content: updatedContent,
    });
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, content: updatedContent };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);

    setEditingPostId(null);
    setIsEditing(false);
  }

  async function handleContentChange(event) {
    setUpdatedContent(event.target.value);
  }

  async function getAllPosts() {
    const response = await axios.get("/api/posts/allPosts");
    setPosts(response.data);
  }

  async function handleDelete(postId) {
    const response = await axios.delete(`/api/posts/${postId}`);
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts);
  }

  // async function checkIfUserIsLoggedIn() {
  //     const response = await axios.get('/api/users/isLoggedIn')
  //     setActiveUsername(response.data.username)
  // }

  useEffect(() => {
    getAllPosts();
  }, []);


  const postList = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const dateType = new Date(post.datePosted);
    const formattedDate = dateType.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const editComponent =
      activeUsername && activeUsername === post.user.username ? (
        <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
          <a
            className="btn btn-link m-0 text-reset"
            role="button"
            data-ripple-color="primary"
            onClick={() => handleEditClick(post._id, post.content)}
          >
            Edit
            <i className="far fa-pen-to-square"></i>
          </a>
          <a
            className="btn btn-link m-0 text-reset"
            role="button"
            data-ripple-color="primary"
            onClick={() => handleDelete(post._id)}
          >
            Delete
            <i className="far fa-trash-can"></i>
          </a>
        </div>
      ) : null;

    const saveComponent = (
      <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
        <a
          className="btn btn-link m-0 text-reset"
          role="button"
          data-ripple-color="primary"
          onClick={() => handleSaveClick(post._id, updatedContent)}
        >
          Save
          <i className="far fa-pen-to-square"></i>
        </a>
      </div>
    );

    const postComponent =
      editingPostId === post._id && isEditing ? (
        <div className="col-md-10 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <a href="#">
                      <p className="fw-bold mb-1">{post.user.username}</p>
                    </a>
                    <div className="form-outline w-75 mb-4">
                      <textarea
                        className="form-control"
                        id="textAreaExample6"
                        rows="3"
                        value={updatedContent}
                        onChange={handleContentChange}
                      />
                    </div>
                  </div>
                </div>
                <span className="badge rounded-pill badge-success">
                  {formattedDate}
                </span>
              </div>
            </div>
            {saveComponent}
          </div>
        </div>
      ) : (
        <div className="col-md-10 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <Link to={"/profile/" + post.user.username}>
                      <p className="fw-bold mb-1">{post.user.username}</p>
                    </Link>
                    <p className="text-muted mb-0">{post.content}</p>
                  </div>
                </div>
                <span className="badge rounded-pill badge-success">
                  {formattedDate}
                </span>
              </div>
            </div>
            {editComponent}
          </div>
        </div>
      );

    postList.push(postComponent);
  }

  return (
    <div>
      <div class="container">
        <div class="square square-lg bg-white text-white">
          <small>Square</small>
        </div>
        <div class="square square-lg bg-white text-white">
          <small>Square</small>
        </div>
        <div class="square square-lg bg-white text-white">
          <small>Square</small>
        </div>
      </div>
      <div className="flex-column d-flex align-items-center">{postList}</div>
    </div>
  );
}
