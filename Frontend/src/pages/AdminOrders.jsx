import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/api";
import "../AdminOrders.css";

function AdminOrders() {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    try {
      const data = await getAllOrders();

      console.log("Orders data:", data);

      setOrders(data.allorder || []);
    } catch (error) {
      console.error("Orders error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function handleStatusUpdate(orderId) {
    try {
      const data = await updateOrderStatus(orderId);

      console.log("Status updated:", data);

      fetchOrders();
    } catch (error) {
      console.error("Status update error:", error);
    }
  }

  if (loading) {
    return (
      <div className="orders-loading">
        <div>
          <h2>Loading Orders...</h2>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders">

      {/* Header */}

      <div className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>Manage and track all cafe orders</p>
        </div>

        <div className="orders-count">
          {orders.length} Orders
        </div>
      </div>

      {/* Orders */}

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No Orders Found</h3>
          <p>There are currently no orders available.</p>
        </div>
      ) : (
        <div className="orders-grid">

          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              {/* Order Header */}

              <div className="order-top">

                <div>
                  <div className="order-number">
                    {order.orderNumber}
                  </div>

                  <div className="order-id">
                    ID: {order._id}
                  </div>
                </div>

                <span
                  className={`status-badge status-${order.orderStatus}`}
                >
                  {order.orderStatus}
                </span>

              </div>

              {/* Items */}

              <div className="order-items">

                <div className="section-title">
                  Order Items
                </div>

                {order.items?.map((item, index) => (
                  <div className="order-item" key={index}>

                    <div className="item-name">
                      {item.menuItem?.name || "Menu Item"}
                    </div>

                    <div className="item-quantity">
                      × {item.quantity}
                    </div>

                    <div className="item-price">
                      ₹{item.subtotal?.toFixed(2) || "0.00"}
                    </div>

                  </div>
                ))}

              </div>

              {/* Order Information */}

              <div className="order-info">

                <div className="info-item">
                  <span>Table</span>

                  <strong>
                    {order.table?.tableNumber
                      ? `Table ${order.table.tableNumber}`
                      : "Not Assigned"}
                  </strong>
                </div>

                <div className="info-item">
                  <span>Status</span>

                  <strong>
                    {order.orderStatus}
                  </strong>
                </div>

              </div>

              {/* Payment */}

              <div className="payment-row">

                <span className="payment-label">
                  Payment
                </span>

                <span className="payment-method">
                  {order.payment?.paymentMethod || "Not Paid"}
                </span>

              </div>

              {/* Total */}

              <div className="order-total">

                <span>Total Amount</span>

                <strong>
                  ₹
                  {order.billing?.totalAmount?.toFixed(2) || "0.00"}
                </strong>

              </div>

              {/* Update Status */}

              <button
                className="update-status-btn"
                onClick={() => handleStatusUpdate(order._id)}
                disabled={
                  order.orderStatus === "served" ||
                  order.orderStatus === "cancelled"
                }
              >
                {order.orderStatus === "served"
                  ? "Order Completed"
                  : order.orderStatus === "cancelled"
                  ? "Order Cancelled"
                  : "Update Status"}
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
export default AdminOrders;