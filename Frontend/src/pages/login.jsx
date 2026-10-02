import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const data = await loginUser(email, password);

      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.decoded));

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="cafe-info">
          <div className="coffee-icon">☕</div>

          <h1>Smart Cafe</h1>

          <p>
            Smart Cafe Management System
          </p>

          <span>
            Manage your cafe smarter, faster & better.
          </span>
        </div>

        <div className="login-card">
          <h2>Welcome Back!</h2>
          <p className="login-subtitle">
            Login to your cafe dashboard
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;

