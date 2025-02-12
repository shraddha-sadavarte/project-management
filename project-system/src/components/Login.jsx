import React, { useEffect } from "react";
import Auth from "./Auth";

const Login = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/login"; // Redirect to login page if already logged in
    }
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login Successful!");
        localStorage.setItem("token", data.token); // Store authentication token
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        return { success: false, message: "Invalid username or password." };
      }
    } catch (error) {
      return { success: false, message: "Server error. Try again later." };
    }
  };

  return <Auth isLogin={true} onSubmit={handleLogin} />;
};

export default Login;
