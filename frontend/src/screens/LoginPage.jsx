import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const inputError = {
    border: `2px solid red`,
  };

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault(); // ⬅️ Prevents page reload
  
    // Optional: Check empty fields manually before sending request
    if (!username) {
      setUsernameEmpty(true);
      return;
    }
    if (!password) {
      setPasswordEmpty(true);
      return;
    }
  
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
  
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      onLogin();
      navigate("/members");
    } else {
      alert("Login failed");
    }
  };
  
  return (
    <div
    className="container"
    style={{
      marginTop: "5%",
      maxWidth: "900px",
      marginBottom:"5%",
      borderRadius: "30px"
    }}
  >
    <div
      className={`card text-bg-light`}
      style={{ boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)",   borderRadius: "10px" }}
    >
      <div className="card-header">Admin Login Details</div>
      <div className="card-body">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="username-address" className="form-label">
              Username 
            </label>
            <input
              className="form-control rounded"
              id="username"
              name="username"
              type="username"
              value={username}
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              style={usernameEmpty ? inputError : null}
              
            />
            {usernameEmpty ? (
              <div className="error-message">
                <small style={{ color: "red" }}>Username cannot be empty!</small>
              </div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-control rounded"
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              style={passwordEmpty ? inputError : null}
            />
            {passwordEmpty ? (
              <div className="error-message">
                <small style={{ color: "red" }}>
                  Password cannot be empty!
                </small>
              </div>
            ) : null}
          </div>

          <div>
            <button
              className="btn"
              style={{backgroundColor:"#000000" , color:"#ffffff"}}
              type="submit"
            >
              Sign In
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;