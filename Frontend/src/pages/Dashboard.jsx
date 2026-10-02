import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboard();
        console.log("Dashboard data:", data);
        setDashboard(data);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    }

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <span>☕</span>

          <div>
            <h2>Smart Cafe</h2>
            <p>Management System</p>
          </div>
        </div>

        <nav className="sidebar-menu">

          <div className="menu-item active">
            <span>📊</span>
            Dashboard
          </div>

          
           <div
  className="menu-item"
  onClick={() => navigate("/admin/menu")}
>
  <span>🍔</span>
  Menu
</div>

          <div
  className="menu-item"
  onClick={() => window.location.href = "/admin/tables"}
>
  <span>🪑</span>
  Tables
</div>

          <div
  className="menu-item"
  onClick={() => navigate("/admin/customers")}
>
  <span>👥</span>
  Customers
</div>

          <div
  className="menu-item"
  onClick={() => navigate("/admin/orders")}
>
  <span>🧾</span>
  Orders
</div>
         <div
  className="menu-item"
  onClick={() => navigate("/admin/payments")}
>
  <span>💳</span>
  Payments
</div>

<div
  className="menu-item"
  onClick={() => navigate("/admin/reports")}
>
  <span>📊</span>
  Reports
</div>

          <div className="menu-item ai-menu">
            <span>🤖</span>
            AI Assistant
          </div>

        </nav>

        <div className="sidebar-bottom">

          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>

          </div>

        </div>

      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back! Here's what's happening in your cafe.
            </p>
          </div>

          <div className="header-right">

            <div className="notification">
              🔔
            </div>

            <div className="header-admin">

              <div className="admin-avatar">
                A
              </div>

              <div>
                <strong>Admin</strong>
                <small>Manager</small>
              </div>

            </div>

          </div>

        </header>

        {/* Stats */}
        <section className="stats-grid">

          {/* Total Customers */}
          <div className="stat-card">

            <div className="stat-icon customers-icon">
              👥
            </div>

            <div>

              <p>Total Customers</p>

              <h2>
                {dashboard.TotalCustomers}
              </h2>

              <span className="stat-label">
                Registered customers
              </span>

            </div>

          </div>

          {/* Total Orders */}
          <div className="stat-card">

            <div className="stat-icon orders-icon">
              🧾
            </div>

            <div>

              <p>Total Orders</p>

              <h2>
                {dashboard.TotalOrders}
              </h2>

              <span className="stat-label">
                Orders received
              </span>

            </div>

          </div>

          {/* Total Revenue */}
          <div className="stat-card">

            <div className="stat-icon revenue-icon">
              ₹
            </div>

            <div>

              <p>Total Revenue</p>

              <h2>
                ₹{dashboard.TotalRevenue}
              </h2>

              <span className="stat-label">
                Successful payments
              </span>

            </div>

          </div>

          {/* Tables */}
          <div className="stat-card">

            <div className="stat-icon table-icon">
              🪑
            </div>

            <div>

              <p>Tables</p>

              <h2>
                {dashboard.OccupiedTable}
              </h2>

              <span className="stat-label">
                {dashboard.AvailableTable} available
              </span>

            </div>

          </div>

        </section>

        {/* Middle Section */}
        <section className="dashboard-grid">

          {/* Order Status */}
          <div className="dashboard-box">

            <div className="box-header">

              <div>

                <h2>Order Status</h2>

                <p>
                  Current order overview
                </p>

              </div>

              <span className="box-icon">
                🧾
              </span>

            </div>

            <div className="status-list">

              {dashboard.TotalStatus.map((item) => (

                <div
                  className="status-row"
                  key={item._id}
                >

                  <div className="status-name">

                    <span
                      className={`status-dot ${item._id}`}
                    ></span>

                    <span>
                      {item._id}
                    </span>

                  </div>

                  <strong>
                    {item.status}
                  </strong>

                </div>

              ))}

            </div>

          </div>

          {/* Table Status */}
          <div className="dashboard-box">

            <div className="box-header">

              <div>

                <h2>Table Status</h2>

                <p>
                  Current table availability
                </p>

              </div>

              <span className="box-icon">
                🪑
              </span>

            </div>

            <div className="table-status">

              <div className="table-stat occupied">

                <span>
                  🪑
                </span>

                <div>

                  <strong>
                    {dashboard.OccupiedTable}
                  </strong>

                  <p>
                    Occupied
                  </p>

                </div>

              </div>

              <div className="table-stat available">

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    {dashboard.AvailableTable}
                  </strong>

                  <p>
                    Available
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Payment Methods */}
        <section className="dashboard-box payment-box">

          <div className="box-header">

            <div>

              <h2>Payment Methods</h2>

              <p>
                Successful payments by method
              </p>

            </div>

            <span className="box-icon">
              💳
            </span>

          </div>

          <div className="payment-list">

            {dashboard.PaymentMethod &&
            dashboard.PaymentMethod.length > 0 ? (

              dashboard.PaymentMethod.map((item) => {

                const paymentName =
                  item._id.charAt(0).toUpperCase() +
                  item._id.slice(1);

                const paymentIcon =
                  item._id === "cash"
                    ? "💵"
                    : item._id === "upi"
                    ? "📱"
                    : "💳";

                return (

                  <div
                    className="payment-card"
                    key={item._id}
                  >

                    <div className="payment-card-icon">
                      {paymentIcon}
                    </div>

                    <div className="payment-card-info">

                      <h3>
                        {paymentName}
                      </h3>

                      <span>
                        Successful Payments
                      </span>

                    </div>

                    <div className="payment-card-count">
                      {item.method}
                    </div>

                  </div>

                );

              })

            ) : (

              <div className="no-payment">
                No payment data available
              </div>

            )}

          </div>

        </section>

        {/* Sales Analysis */}
        <section className="dashboard-box sales-box">

          <div className="box-header">

            <div>

              <h2>Best Selling Items</h2>

              <p>
                Sales performance by menu item
              </p>

            </div>

            <span className="box-icon">
              📈
            </span>

          </div>

          <div className="sales-list">

            {dashboard.salesAnalysis &&
            dashboard.salesAnalysis.length > 0 ? (

              dashboard.salesAnalysis.map(
                (item, index) => (

                  <div
                    className="sales-row"
                    key={item.menuName}
                  >

                    <div className="food-rank">
                      #{index + 1}
                    </div>

                    <div className="food-info">

                      <strong>
                        {item.menuName}
                      </strong>

                      <span>
                        {item.totalquantity} items sold
                      </span>

                    </div>

                    <div className="food-revenue">
                      ₹{item.subtotal}
                    </div>

                  </div>

                )
              )

            ) : (

              <div className="no-payment">
                No sales data available
              </div>

            )}

          </div>

        </section>
        


      </main>

    </div>
  );
}

export default Dashboard;

