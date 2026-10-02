import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import "./admin_reports.css";

function AdminReports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const data = await getDashboard();
      console.log("REPORT DATA:", data);
      setReport(data);
    } catch (error) {
      console.log("REPORT ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="reports-loading">
        <h2>Loading Reports...</h2>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="reports-loading">
        <h2>Reports data not found</h2>
      </div>
    );
  }

  return (
    <div className="admin-reports-page">

      {/* Header */}
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Track your cafe performance and sales</p>
        </div>

        <button className="refresh-report-btn" onClick={fetchReports}>
          🔄 Refresh
        </button>
      </div>

      {/* Main Stats */}
      <div className="reports-stats-grid">

        <div className="report-stat-card">
          <div className="report-stat-icon">💰</div>
          <div>
            <span>Total Revenue</span>
            <h2>₹{report.TotalRevenue || 0}</h2>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">🧾</div>
          <div>
            <span>Total Orders</span>
            <h2>{report.TotalOrders || 0}</h2>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">👥</div>
          <div>
            <span>Total Customers</span>
            <h2>{report.TotalCustomers || 0}</h2>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">🪑</div>
          <div>
            <span>Occupied Tables</span>
            <h2>{report.OccupiedTable || 0}</h2>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="report-stat-icon">🟢</div>
          <div>
            <span>Available Tables</span>
            <h2>{report.AvailableTable || 0}</h2>
          </div>
        </div>

      </div>

      {/* Middle Section */}
      <div className="reports-two-column">

        {/* Payment Methods */}
        <div className="report-section-card">
          <div className="report-section-header">
            <h2>Payment Methods</h2>
            <span>Successful Payments</span>
          </div>

          <div className="payment-report-list">
            {report.PaymentMethod?.length > 0 ? (
              report.PaymentMethod.map((payment) => (
                <div className="payment-report-item" key={payment._id}>

                  <div className="payment-report-left">
                    <div className="payment-icon">
                      {payment._id === "cash"
                        ? "💵"
                        : payment._id === "upi"
                        ? "📱"
                        : "💳"}
                    </div>

                    <div>
                      <h3>
                        {payment._id
                          ? payment._id.toUpperCase()
                          : "Unknown"}
                      </h3>
                      <p>Successful transactions</p>
                    </div>
                  </div>

                  <strong>{payment.method || 0}</strong>

                </div>
              ))
            ) : (
              <div className="report-empty">
                No payment data available
              </div>
            )}
          </div>
        </div>

        {/* Order Status */}
        <div className="report-section-card">
          <div className="report-section-header">
            <h2>Order Status</h2>
            <span>All Orders</span>
          </div>

          <div className="order-status-list">
            {report.TotalStatus?.length > 0 ? (
              report.TotalStatus.map((status) => (
                <div className="order-status-item" key={status._id}>

                  <div className="status-left">
                    <span
                      className={`status-dot status-${status._id}`}
                    ></span>

                    <span className="status-name">
                      {status._id
                        ? status._id.charAt(0).toUpperCase() +
                          status._id.slice(1)
                        : "Unknown"}
                    </span>
                  </div>

                  <strong>{status.status || 0}</strong>

                </div>
              ))
            ) : (
              <div className="report-empty">
                No order status data available
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Sales Analysis */}
      <div className="report-section-card sales-report-card">

        <div className="report-section-header">
          <div>
            <h2>Top Selling Items</h2>
            <span>Sales performance by menu item</span>
          </div>
        </div>

        {report.salesAnalysis?.length > 0 ? (
          <div className="sales-table-wrapper">

            <table className="sales-report-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Menu Item</th>
                  <th>Total Quantity</th>
                  <th>Total Sales</th>
                </tr>
              </thead>

              <tbody>
                {report.salesAnalysis.map((item, index) => (
                  <tr key={index}>

                    <td>
                      <span className="sales-number">
                        {index + 1}
                      </span>
                    </td>

                    <td>
                      <strong className="sales-item-name">
                        {item.menuName || "Unknown Item"}
                      </strong>
                    </td>

                    <td>
                      <span className="quantity-badge">
                        {item.totalquantity || 0}
                      </span>
                    </td>

                    <td>
                      <strong className="sales-amount">
                        ₹{item.subtotal || 0}
                      </strong>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        ) : (
          <div className="report-empty sales-empty">
            <div>📊</div>
            <h3>No Sales Data</h3>
            <p>
              Sales information will appear here when customers place orders.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default AdminReports;
