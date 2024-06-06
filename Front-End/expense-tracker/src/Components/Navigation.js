import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="nav-bg text-white">
      <div className="title">
        Inventory & Expense Tracker!
      </div>
      <div style={{ paddingLeft: "12%" }}>
        <div className="nav-links">
          <Link to="/" className="nav-item">
            Dashboard
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-item">
            Inventory
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/expense" className="nav-item">
            Expense
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/income" className="nav-item">
            Income
          </Link>
        </div>
      </div>
      <div className="profile-section">
        <div className="hz-rule"></div>
        <div className="d-flex mt-2 mb-2" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <div className="profile-icon">IN</div>
          <div style={{ textAlign: "center", paddingTop: "5%", width: "110px", color:"black" }}>
              UserName
           </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
