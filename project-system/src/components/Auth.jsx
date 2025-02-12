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
    
    if (!formData.username || (!isLogin && !formData.email) || !formData.password) {
      setError("Username and password are required.");
      return;
    }
    
    if (!isLogin && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!isLogin && formData.password.length < 8) {
      setError("Password must be at least 8 characters and include a special character.");
      return;
    }

    try {
      const response = await onSubmit(formData);
      if (!response.success) {
        setError(response.message || "Invalid username or password.");
      } else if (!isLogin) {
        alert("Registration successful! Redirecting to login page.");
        navigate("/login");
      }
    } catch (err) {
      setError("There was an error while logging in. Please try again later.");
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
