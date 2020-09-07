import axios from "axios";

const getAll = async () => {
  const { data } = await axios.get("/api/blogs");
  return data;
};

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.post("/api/blogs", newBlog, config);
  return data;
};

const update = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.put(`/api/blogs/${id}`, {}, config);
  return data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.delete(`/api/blogs/${id}`, config);
  return data;
};

export default { getAll, create, update, setToken, deleteBlog };
