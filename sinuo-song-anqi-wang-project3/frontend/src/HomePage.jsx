import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    }
    getPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => {
        return (
          <PostCard
            content={post.content}
            username={post.user.username}
            datePosted={post.datePosted}
          />
        );
      })}
    </div>
  );
}
