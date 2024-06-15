
import React, { useState } from "react";
import "../styles/auth.css";
import { localhost_backend } from "../env";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);
  let handleSubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      "username": username,
      "password": password
    });
    fetch(localhost_backend + 'api/token/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Login failed");
          }
        })
        .then(response => {
          localStorage.setItem("username", username);
          localStorage.setItem("authToken", response['access']);
          navigate("/");
        })
        .catch(error => {
          setError(error.message);
        });
  };

  return (
      <div className="main-container">
        <div className="sec-container">
          <div className="main-box">
            <div className="img-box">
              <img src="../../login.jpg" alt="" />
            </div>

            <div className="form-box">
              <h1>
                Inventory and Expense Tracker For Small and Mid Range Business
              </h1>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column">
                  <label className="labels">UserName</label>
                  <input
                      type="text"
                      name="username"
                      className="input-login"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                  />
                </div>
                <div className="d-flex flex-column">
                  <label className="labels">Password</label>
                  <input
                      type="password"
                      name="password"
                      className="input-login"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                  />
                </div>
                <div className="button-container">
                  <button
                      type="submit"
                      className="login-button"
                  >
                    Log In
                  </button>

                  <button className="register-button">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={"/register"}>Register</Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Auth;
