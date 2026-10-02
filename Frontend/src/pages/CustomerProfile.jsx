import { useNavigate } from "react-router-dom";
import "./customer_profile.css";

function CustomerProfile() {
  const navigate = useNavigate();

  const savedCustomer = localStorage.getItem("customer");
  const customer = savedCustomer ? JSON.parse(savedCustomer) : null;

  if (!customer) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <h2>Customer profile not found</h2>
          <button onClick={() => navigate("/customer-login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const memberSince = customer.createdAt
    ? new Date(customer.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <button
          className="back-button"
          onClick={() => navigate("/customer-dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1>My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="profile-card">

        <div className="profile-top">
          <div className="profile-avatar">
            {customer.name?.charAt(0).toUpperCase() || "C"}
          </div>

          <div className="profile-heading">
            <h2>{customer.name || "Customer"}</h2>
            <p>Smart Cafe Customer</p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="profile-details">

          <div className="profile-detail">
            <span className="detail-icon">👤</span>
            <div>
              <small>Full Name</small>
              <strong>{customer.name || "Not available"}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <span className="detail-icon">📧</span>
            <div>
              <small>Email</small>
              <strong>{customer.email || "Not available"}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <span className="detail-icon">📱</span>
            <div>
              <small>Phone</small>
              <strong>{customer.phone || "Not available"}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <span className="detail-icon">📍</span>
            <div>
              <small>Address</small>
              <strong>{customer.address || "Not available"}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <span className="detail-icon">📅</span>
            <div>
              <small>Member Since</small>
              <strong>{memberSince}</strong>
            </div>
          </div>

        </div>

        <div className="profile-footer">
          <button
            onClick={() => navigate("/customer-dashboard")}
          >
            Go to Dashboard →
          </button>
        </div>

      </div>

    </div>
  );
}

export default CustomerProfile;

