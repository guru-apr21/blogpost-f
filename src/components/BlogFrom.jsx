import React, { useState } from "react";

const BlogFrom = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [visible, setVisible] = useState(false);

  const create = (e) => {
    e.preventDefault();
    handleCreate({ author, url, title });
    setAuthor("");
    setTitle("");
    setURL("");
  };

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(!visible)}>Create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={create}>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            placeholder="Enter blog title here..."
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
          <div>
            <label htmlFor="author">Author: </label>
            <input
              id="author"
              type="text"
              placeholder="Enter Author's name here..."
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="url">URL: </label>
            <input
              id="url"
              type="text"
              placeholder="Enter blog's url here..."
              value={url}
              onChange={({ target }) => setURL(target.value)}
            ></input>
          </div>
          <button type="submit">Create</button>
        </form>
        <button onClick={() => setVisible(!visible)}>cancel</button>
      </div>
    </>
  );
};

export default BlogFrom;
