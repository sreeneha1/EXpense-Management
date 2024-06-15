import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  const username = localStorage.getItem("username");

  return (
    <div className="nav-bg">
      <div className="title p-2">XpenseTrack</div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Dashboard</Link>
        <Link to="/inventory" className="nav-item">Inventory</Link>
        <Link to="/expense" className="nav-item">Expense</Link>
      </div>
      <div className="profile-container">
        {username ? (
          <>
            <div className="profile-icon">{username[0].toUpperCase()}</div>
            <div className="profile-name">{username}</div>
          </>
        ) : (
          <div className="profile-placeholder">Not logged in</div>
        )}
      </div>
    </div>
  );
}

export default Navigation;