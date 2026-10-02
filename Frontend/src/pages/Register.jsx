import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful");

      navigate("/");

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
          <p>Smart Cafe Management System</p>
          <span>Create your staff account.</span>
        </div>

        <div className="login-card">
          <h2>Create Account</h2>
          <p className="login-subtitle">
            Register for cafe management
          </p>

          <form onSubmit={handleRegister}>

            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

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
              Create Account
            </button>

          </form>

          <p style={{ marginTop: "15px" }}>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;