import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CustomerRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/createcustomer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            address,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Customer registration failed");
      }

      alert("Customer registration successful");

      navigate("/customer-login");

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

          <p>Customer Registration</p>

          <span>
            Create your customer account and order your favourite food.
          </span>
        </div>

        <div className="login-card">

          <h2>Create Customer Account</h2>

          <p className="login-subtitle">
            Register as a cafe customer
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

            <div className="input-group">
              <label>Phone</label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Address</label>

              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Create Customer Account
            </button>

          </form>

          <p style={{ marginTop: "15px" }}>
            Already have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/customer-login")}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Customer Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;