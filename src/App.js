import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInAppUser");
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await loginService.login(credentials);
      if (data) {
        window.localStorage.setItem("loggedInAppUser", JSON.stringify(data));
        setUser(data);
      }
    } catch (err) {
      setMessage("Invalid credentials");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <>
      {user === null && (
        <>
          <h1>login to application</h1>
          {message && (
            <p className="notification" style={{ color: "red" }}>
              {message}
            </p>
          )}
          <LoginForm handleLogin={handleLogin}></LoginForm>
        </>
      )}
      {user !== null && <Blogs user={user} handleLogout={handleLogout}></Blogs>}
    </>
  );
};

export default App;
