import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="text-4xl font-semibold italic font-[cursive] text-[#6d2230] tracking-wider">
  STARLA <span className="block text-base font-light tracking-[0.3em]">JEWELS</span>
</h2>

      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <span onClick={handleLogout} className="profile-icon">👤</span>
      </div>
    </nav>
  );
}

export default Navbar;
