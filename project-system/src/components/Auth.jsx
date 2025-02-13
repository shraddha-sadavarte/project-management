import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const endpoint = isLogin ? "login" : "register";
    const apiUrl = `http://localhost:5000/api/auth/${endpoint}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!data.success) {
        setError(data.message || "Something went wrong.");
      } else {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard";
        } else {
          alert("Registration successful! Redirecting to login.");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };  

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        {!isLogin && <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />}
        <div className="password-field">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>👁</button>
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      {!isLogin && (
        <p>
          Already registered? <button onClick={() => navigate("/login")} className="link-button">Login here</button>
        </p>
      )}
    </div>
  );
};

export default Auth;
