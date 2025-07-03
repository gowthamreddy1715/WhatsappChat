import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password1: "", password2: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password1 !== form.password2) return alert("Passwords do not match");
    try {
      const res = await axios.post("http://localhost:5000/register", form);
      localStorage.setItem("token", res.data.token);
      alert("Registered successfully");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h3 style={{ textAlign: "center", color: "darkmagenta", marginBottom: "20px" }}>
  Register here !
</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" placeholder="Email Address" required onChange={handleChange} />
        <input name="password1" type="password" placeholder="Password" required onChange={handleChange} />
        <input name="password2" type="password" placeholder="Confirm Password" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
