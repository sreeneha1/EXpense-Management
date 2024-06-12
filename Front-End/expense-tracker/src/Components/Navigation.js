import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="nav-bg">
      <div className="title p-2">XpenseTrack</div>
      <div className = "nav-links">
          <Link to="/" className="nav-item">Dashboard</Link>
          <Link to="/inventory" className="nav-item">Inventory</Link>
          <Link to="/expense" className="nav-item">Expense</Link>
      </div>
      <div className="profile-container">
        <div className="profile-icon">IN</div>
        <div className="profile-name">UserName</div>
      </div>
    </div>
  );
}

export default Navigation;
