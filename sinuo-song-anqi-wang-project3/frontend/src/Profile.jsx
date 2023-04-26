import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";
import { formatDate } from "./util";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      const response = await axios.get("/api/users/lookup/" + username);
      setUser(response.data);
    }
    if (!username) {
      return;
    }
    getUserInfo();
  }, [username]);

  useEffect(() => {
    async function getLoggedinUser() {
      const response = await axios.get("/api/users/isLoggedIn");
      setLoggedinUser(response.data);
    }
    getLoggedinUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{user.username}</h1>
      <div>{formatDate(user.dateJoined)}</div>
      <div>{user.bio}</div>
      {loggedinUser && loggedinUser.username === user.username && (
        <textarea value={user.bio} />
      )}
      <div>
        {user.posts.map((post) => {
          return (
            <PostCard
              content={post.content}
              username={user.username}
              datePosted={post.datePosted}
            />
          );
        })}
      </div>
    </div>
  );
}
