import React, { useEffect, useState } from "react";
import blogService from "../services/blog";
import BlogFrom from "./BlogFrom";
import Blog from "./Blog";

const Blogs = ({ user, handleLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((data) => {
      const blogsToShow = data.filter((b) => b.user.username === user.username);
      setBlogs(blogsToShow);
    });
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (newBlog) => {
    try {
      blogService.setToken(user.token);
      const data = await blogService.create(newBlog);
      setBlogs([...blogs, data]);
      setMessage(`A new blog ${data.title} ${data.author} added`);
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const incrementLikes = async (id) => {
    try {
      blogService.setToken(user.token);
      const data = await blogService.update(id);
      const newBlogs = blogs.map((blog) => (blog.id === id ? data : blog));
      setBlogs(newBlogs);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteBlog = async (id, title) => {
    try {
      const result = window.confirm(`delete ${title} ?`);
      if (result) {
        blogService.setToken(user.token);
        await blogService.deleteBlog(id);
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(newBlogs);
      }
      return;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h2>Blogs</h2>
      {message && (
        <p className="notification" style={{ color: "green" }}>
          {message}
        </p>
      )}
      <p>
        Logged in as <strong>{user.name}</strong>
        <button onClick={() => handleLogout()}>Log Out</button>
      </p>

      <BlogFrom handleCreate={handleCreate}></BlogFrom>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          incrementLikes={incrementLikes}
          deleteBlog={deleteBlog}
        ></Blog>
      ))}
    </>
  );
};

export default Blogs;
