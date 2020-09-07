import React, { useState } from "react";

const Blog = ({ blog, incrementLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card">
      <p>
        {blog.title} {blog.author + " "}{" "}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </p>
      {visible && (
        <>
          {" "}
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{" "}
            <button onClick={() => incrementLikes(blog.id)}>like</button>
          </p>
          <button onClick={() => deleteBlog(blog.id, blog.title)}>
            remove
          </button>
        </>
      )}
    </div>
  );
};

export default Blog;
