import React, { useState } from "react";

const PostModal = ({ onClose, onPostCreated }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !content) return alert("All fields are required!");

    try {
      const res = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, content }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      setAuthor("");
      setContent("");
      onPostCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Your Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="actions">
            <button type="submit">Submit</button>
            <button onClick={onClose} type="button" className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
