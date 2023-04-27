import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./App";
import { useParams } from "react-router";
import { formatDate } from "./util";

export default function Profile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { activeUsername } = useContext(UserContext);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [bioEditor, setBioEditor] = useState(false);

  const handleEditClick = (postId, currentContent) => {
    setEditingPostId(postId);
    setIsEditing(true);
    setUpdatedContent(currentContent);
  };

  const handleBioEditClick = (currentBio) => {
    setBioEditor(true);
    setUpdatedBio(currentBio);
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

  async function handleBioSaveClick(updatedBio) {
    const response = await axios.put(`/api/users/update`, {
      bio: updatedBio,
    });
    const updatedUserInfo = { ...userInfo, bio: updatedBio };
    setUserInfo(updatedUserInfo);
    setBioEditor(false);
  }

  async function handleContentChange(event) {
    setUpdatedContent(event.target.value);
  }

  async function handleBioChange(event) {
    setUpdatedBio(event.target.value);
  }

  async function handleDelete(postId) {
    const response = await axios.delete(`/api/posts/${postId}`);
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts);
  }

  useEffect(() => {
    async function getUserInfo() {
      const response = await axios.get("/api/users/lookup/" + username);
      setUserInfo(response.data);
    }
    if (!username) {
      return;
    }
    getUserInfo();
  }, [username]);

  useEffect(() => {
    setPosts(
      userInfo?.posts.map((post) => {
        return {
          ...post,
          user: userInfo,
        };
      }) || []
    );
  }, [userInfo]);

  const gradientStyle = {
    fontSize: "45px",
    background: "-webkit-linear-gradient(blue, #3b71ca)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  };

  const editBioComponent =
    activeUsername && activeUsername === username ? (
      <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
        <a
          className="btn btn-link m-0 text-reset"
          role="button"
          data-ripple-color="primary"
          onClick={() => handleBioEditClick(userInfo.bio)}
        >
          Edit
          <i className="far fa-pen-to-square"></i>
          <i className="far fa-trash-can"></i>
        </a>
      </div>
    ) : null;

  const saveBioComponent = (
    <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
      <a
        className="btn btn-link m-0 text-reset"
        role="button"
        data-ripple-color="primary"
        onClick={() => handleBioSaveClick(updatedBio)}
      >
        Save
        <i className="far fa-pen-to-square"></i>
      </a>
    </div>
  );

  const bioComponent =
    activeUsername === username && bioEditor ? (
      <div class="d-flex justify-content-center">
        <div className="col-md-10 mb-3">
          <div className="card">
            <div className="ms-3">
              <div className="form-outline mb-4">
                <textarea
                  className="form-control w-100"
                  id="textAreaExample6"
                  rows="3"
                  value={updatedBio}
                  onChange={handleBioChange}
                />
              </div>
            </div>
            {saveBioComponent}
          </div>
        </div>
      </div>
    ) : (
      <div class="d-flex justify-content-center">
        <div className="col-md-10 mb-3">
          <div className="card">
            <div className="d-flex  align-items-center ms-3 text-muted mb-0">
              {userInfo !== null && userInfo.bio}
            </div>
            {editBioComponent}
          </div>
        </div>
      </div>
    );

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
        <div className="col-xs-12 col-md-10 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <a href="#">
                      <p className="fw-bold mb-1">{post.user.username}</p>
                    </a>
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

  if (!userInfo) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="square square-lg bg-white text-white">
          <small>Square</small>
        </div>
        <div className="square square-lg bg-white text-white">
          <small>Square</small>
        </div>
        <div className="square square-lg bg-white text-white">
          <small>Square</small>
        </div>
      </div>
      <div className="card  mb-4">
        <div className="card-body text-center">
          <h5 className="my-3 " style={gradientStyle}>
            {userInfo.username}
          </h5>
          <p className="mb-3 badge rounded-pill badge-success">
            Date Joined: {formatDate(userInfo.dateJoined)}
          </p>
          {bioComponent}
          <div className="d-flex justify-content-center mb-2"></div>
        </div>
      </div>
      <div className="flex-column d-flex align-items-center">{postList}</div>
    </div>
  );
}
