import React, { useEffect, useState } from "react";
import PostModal from "./PostModal";
import "./index.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();
      setPosts(data.reverse()); // newest first
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Post Feed</h1>
        <button onClick={() => setShowModal(true)}>Create New Post</button>
      </header>

      <div className="posts">
        {posts.map((post, idx) => (
          <div className="post" key={idx}>
            <h3>{post.author}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <PostModal
          onClose={() => setShowModal(false)}
          onPostCreated={fetchPosts}
        />
      )}
    </div>
  );
};

export default App;
