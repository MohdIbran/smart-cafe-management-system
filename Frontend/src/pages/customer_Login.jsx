import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginCustomer } from "../services/api";

function CustomerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const data = await loginCustomer(email, password);

      console.log("CUSTOMER LOGIN RESPONSE:", data);

      if (!data || !data.token) {
        throw new Error("Customer login response is missing token");
      }

      localStorage.setItem("customerToken", data.token);

      if (data.customer) {
        localStorage.setItem(
          "customer",
          JSON.stringify(data.customer)
        );
      }

      alert("Customer login successful");

      navigate("/customer-dashboard");
    } catch (error) {
      console.error("CUSTOMER LOGIN ERROR:", error);
      alert(error.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="cafe-info">
          <div className="coffee-icon">☕</div>

          <h1>Smart Cafe</h1>

          <p>Customer Login</p>

          <span>
            Order your food and chat with your AI assistant.
          </span>
        </div>

        <div className="login-card">
          <h2>Welcome!</h2>

          <p className="login-subtitle">
            Login as a customer
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

            <button
              type="submit"
              className="login-button"
            >
              Customer Login
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default CustomerLogin;

