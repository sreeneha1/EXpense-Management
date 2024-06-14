import React from "react";
import "../styles/navigation.css";
import { useHistory } from "react-router-dom";

import axios from "axios";

function Navigation() {
    const history = useHistory();

    const handleLogout = async () => {
        try {
            // Example code for logging out (replace with your actual logic)
            // await axios.post('/api/logout');
            // localStorage.removeItem('user');
            history.push('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="nav-bg text-white" style={{ minHeight: "100vh" }}>
            <div className="title p-2">
                Expense Tracker
            </div>
            <div style={{ paddingLeft: "12%", marginTop: "10%" }}>
                <div className="nav-links">
                    <Link to="/" className="nav-item">
                        Dashboard
                    </Link>
                </div>
                <div className="nav-links">
                    <Link to="/inventory" className="nav-item">
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
            <div
                style={{
                    marginLeft: "17px",
                    marginRight: "17px",
                    position: "absolute",
                    bottom: "0",
                }}
            >
                <div className="hz-rule"></div>
                <div
                    className="d-flex mt-2 mb-2"
                    style={{ paddingLeft: "30px", paddingRight: "30px" }}
                >
                    <div className="profile-icon">IN</div>
                    <div
                        style={{ textAlign: "center", paddingTop: "5%", width: "110px" }}
                    >
                        UserName
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
