import React from "react";
import "../styles/navigation.css";
import { Link, useNavigate} from "react-router-dom";
import { localhost_backend } from '../env';

function Navigation() {
  const username = localStorage.getItem("username");
    const navigate = useNavigate()

    const handleLogout = () => {
        try {
            let data = JSON.stringify({
                "refresh":localStorage.getItem("refresh")
            })
            fetch(localhost_backend + 'api/token/blacklist/',{method:"POST",headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },body:data})
                .then((response) => {
                    if(response.status == 200){
                        localStorage.removeItem("authToken")
                        localStorage.removeItem("refresh")
                        navigate('/login');
                    }
                })
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
  return (
    <div className="nav-bg">
      <div className="title p-2">XpenseTrack</div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Dashboard</Link>
        <Link to="/inventory" className="nav-item">Inventory</Link>
        <Link to="/expense" className="nav-item">Expense</Link>
      </div>

        {username ? (
            <>

                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>

                <div className="profile-container">
                <div className="profile-icon">{username[0].toUpperCase()}</div>
                <div className="profile-name">{username}</div>
                </div>
            </>
        ) : (
            <div className="profile-placeholder">Not logged in</div>
        )}


    </div>
  );
}

export default Navigation;