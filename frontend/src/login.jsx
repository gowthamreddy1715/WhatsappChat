import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/home");
    } catch {
      alert("Login failed. Redirecting to register...");
      navigate("/register");
    }
  };

  return (
    <div className="form-container">
      <h3 style={{ textAlign: "center", color: "darkmagenta", marginBottom: "20px" }}>
  Login to STARLA JEWELS
</h3>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email Address" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
