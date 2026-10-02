import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";
import "./myorders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const customer = JSON.parse(localStorage.getItem("customer")) || {};

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";

      case "confirmed":
        return "status-confirmed";

      case "preparing":
        return "status-preparing";

      case "ready":
        return "status-ready";

      case "served":
        return "status-served";

      case "cancelled":
        return "status-cancelled";

      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "◷";

      case "confirmed":
        return "✓";

      case "preparing":
        return "♨";

      case "ready":
        return "✓";

      case "served":
        return "✓";

      case "cancelled":
        return "✕";

      default:
        return "•";
    }
  };

  const getFoodEmoji = (category) => {
    switch (category) {
      case "burger":
        return "🍔";

      case "pizza":
        return "🍕";

      case "coffee":
        return "☕";

      case "tea":
        return "🍵";

      case "dessert":
        return "🍰";

      default:
        return "🍽️";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Status tracker
  const statusSteps = [
    {
      status: "pending",
      label: "Pending",
      icon: "◷",
    },
    {
      status: "confirmed",
      label: "Confirmed",
      icon: "✓",
    },
    {
      status: "preparing",
      label: "Preparing",
      icon: "♨",
    },
    {
      status: "ready",
      label: "Ready",
      icon: "✓",
    },
    {
      status: "served",
      label: "Served",
      icon: "✓",
    },
  ];

  const getStatusIndex = (status) => {
    return statusSteps.findIndex((step) => step.status === status);
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-cup">☕</div>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div className="my-orders-page">

      {/* Sidebar */}
      <aside className="orders-sidebar">

        <div className="orders-logo">
          <div className="orders-logo-icon">☕</div>

          <div>
            <h2>Smart Cafe</h2>
            <span>Good Food&nbsp; • &nbsp;Better Mood</span>
          </div>
        </div>

        <nav className="orders-navigation">

          <button
            onClick={() =>
              (window.location.href = "/customer-dashboard")
            }
          >
            <span>⌂</span>
            Home
          </button>

          <button
            onClick={() =>
              (window.location.href = "/customer-menu")
            }
          >
            <span>🍴</span>
            Menu
          </button>

          <button className="orders-active">
            <span>🛒</span>
            My Orders
          </button>

          <button>
            <span>♙</span>
            Profile
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("customerToken");
              localStorage.removeItem("customer");
              window.location.href = "/customer-login";
            }}
          >
            <span>↪</span>
            Logout
          </button>

        </nav>

        <div className="orders-sidebar-bottom">
          <div className="leaf-decoration">❧</div>

          <p>
            Life Begins
            <br />
            After Coffee
          </p>

          <div className="bottom-cup">☕</div>
        </div>

      </aside>

      {/* Main */}
      <main className="orders-main">

        {/* Header */}
        <header className="orders-header">

          <div className="orders-title">

            <div className="orders-title-icon">
              🛍
            </div>

            <div>
              <h1>My Orders</h1>

              <p>
                Track your delicious journey with us
                <span> ❤️</span>
              </p>
            </div>

          </div>

          <div className="orders-user">

            <div className="orders-user-avatar">
              {customer?.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div>
              <strong>{customer?.name || "Customer"}</strong>
              <small>Customer</small>
            </div>

            <span className="user-arrow">⌄</span>

          </div>

        </header>

        {/* Orders */}
        <section className="orders-list">

          {orders.length === 0 ? (

            <div className="empty-orders">

              <div>🛍️</div>

              <h2>No Orders Yet</h2>

              <p>
                You haven't placed any orders yet.
              </p>

              <button
                onClick={() =>
                  (window.location.href = "/customer-menu")
                }
              >
                🍴 Browse Menu
              </button>

            </div>

          ) : (

            orders.map((order) => {

              const firstItem = order.items?.[0];
              const menuItem = firstItem?.menuItem;

              const currentStatusIndex = getStatusIndex(
                order.orderStatus
              );

              const isCancelled =
                order.orderStatus === "cancelled";

              return (

                <article
                  className={`order-card ${getStatusClass(
                    order.orderStatus
                  )}`}
                  key={order._id}
                >

                  {/* Food Image */}
                  <div className="order-food-image">

                    {menuItem?.imageurl ? (
<img
  src={
    menuItem.imageurl.startsWith("http")
      ? menuItem.imageurl
      : `http://localhost:2000${menuItem.imageurl}`
  }
  alt={menuItem.name}
/>

                    ) : (

                      <div className="food-emoji">
                        {getFoodEmoji(menuItem?.category)}
                      </div>

                    )}

                  </div>

                  {/* Order Information */}
                  <div className="order-information">

                    <div className="order-top">

                      <div>

                        <h2>
                          Order&nbsp; #{order.orderNumber}
                        </h2>

                        <p className="order-date">
                          ▣ &nbsp;
                          {formatDate(order.createdAt)}
                        </p>

                      </div>

                      <div
                        className={`order-status ${getStatusClass(
                          order.orderStatus
                        )}`}
                      >

                        <span>
                          {getStatusIcon(order.orderStatus)}
                        </span>

                        {order.orderStatus
                          ?.charAt(0)
                          .toUpperCase() +
                          order.orderStatus?.slice(1)}

                      </div>

                    </div>

                    {/* ORDER STATUS TRACKER */}
                    {isCancelled ? (

                      <div className="cancelled-order-status">
                        <div className="cancelled-icon">
                          ✕
                        </div>

                        <div>
                          <strong>Order Cancelled</strong>
                          <p>
                            This order has been cancelled.
                          </p>
                        </div>
                      </div>

                    ) : (

                      <div className="order-progress">

                        {statusSteps.map((step, index) => {

                          const isActive =
                            index <= currentStatusIndex;

                          const isCurrent =
                            index === currentStatusIndex;

                          return (
                            <div
                              className="progress-wrapper"
                              key={step.status}
                            >

                              <div
                                className={`progress-step ${
                                  isActive ? "active" : ""
                                } ${
                                  isCurrent ? "current" : ""
                                }`}
                              >

                                <div className="progress-circle">
                                  {isActive
                                    ? "✓"
                                    : step.icon}
                                </div>

                                <span>
                                  {step.label}
                                </span>

                              </div>

                              {index <
                                statusSteps.length - 1 && (

                                <div
                                  className={`progress-line ${
                                    index <
                                    currentStatusIndex
                                      ? "active"
                                      : ""
                                  }`}
                                ></div>

                              )}

                            </div>
                          );
                        })}

                      </div>

                    )}

                    <div className="order-meta">

                      <div className="meta-item">

                        <span className="meta-icon">
                          🪑
                        </span>

                        <div>
                          <small>Table No.</small>

                          <strong>
                            {order.table?.tableNumber || "—"}
                          </strong>
                        </div>

                      </div>

                      <div className="meta-divider"></div>

                      <div className="meta-item">

                        <span className="meta-icon">
                          ▣
                        </span>

                        <div>
                          <small>Payment</small>

                          <strong>
                            {order.payment?.paymentStatus
                              ? order.payment.paymentStatus
                                  .charAt(0)
                                  .toUpperCase() +
                                order.payment.paymentStatus.slice(1)
                              : "Pending"}
                          </strong>
                        </div>

                      </div>

                    </div>

                    {/* Item */}
                    <div className="order-item">
                      <div className="small-food-image">

  {menuItem?.imageurl ? (

    <img
      src={
        menuItem.imageurl.startsWith("http")
          ? menuItem.imageurl
          : `http://localhost:2000${menuItem.imageurl}`
      }
      alt={menuItem.name}
    />

  ) : (

    <div className="food-emoji">
      {getFoodEmoji(menuItem?.category)}
    </div>

  )}

</div>

                    
                      <div className="item-name">
                        {menuItem?.name || "Food Item"}
                      </div>

                      <div className="item-quantity">
                        × {firstItem?.quantity || 1}
                      </div>

                      <div className="item-price">
                        ₹ {firstItem?.subtotal || 0}
                      </div>

                      <span className="item-arrow">
                        ›
                      </span>

                    </div>

                  </div>

                  {/* Total */}
                  <div className="order-total">

                    <div>

                      <span>Total Amount</span>

                      <strong>
                        ₹ {order.billing?.totalAmount || 0}
                      </strong>

                    </div>

                    <button
                      className="view-details"
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                    >
                      👁 View Details
                    </button>

                  </div>

                </article>

              );
            })

          )}

        </section>

        {/* Footer */}
        <footer className="orders-footer">

          <span>────</span>

          <div>
            ☕ &nbsp; Thank you for choosing
            <strong> Smart Cafe</strong> ❤️
          </div>

          <span>────</span>

        </footer>

      </main>


      {/* =========================
          ORDER DETAILS MODAL
         ========================= */}

      {selectedOrder && (

        <div className="order-modal-overlay">

          <div className="order-modal">

            {/* Modal Header */}
            <div className="order-modal-header">

              <div>

                <span>ORDER DETAILS</span>

                <h2>
                  {selectedOrder.orderNumber}
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>


            {/* Modal Body */}
            <div className="order-modal-body">

              {/* Status */}
              <div className="modal-status-row">

                <strong>Status</strong>

                <span
                  className={`status-badge ${selectedOrder.orderStatus}`}
                >
                  {selectedOrder.orderStatus}
                </span>

              </div>


              {/* Order Information */}
              <div className="modal-info-grid">

                <div className="modal-info-box">

                  <small>Table</small>

                  <strong>
                    Table{" "}
                    {selectedOrder.table?.tableNumber || "—"}
                  </strong>

                </div>


                <div className="modal-info-box">

                  <small>Payment</small>

                  <strong>
                    {selectedOrder.payment?.paymentStatus ||
                      "Pending"}
                  </strong>

                </div>


                <div className="modal-info-box">

                  <small>Date</small>

                  <strong>
                    {selectedOrder.createdAt
                      ? new Date(
                          selectedOrder.createdAt
                        ).toLocaleDateString("en-IN")
                      : "—"}
                  </strong>

                </div>

              </div>


              {/* Ordered Items */}
              <h3 className="modal-items-title">
                Ordered Items
              </h3>


              <div className="modal-items">

                {selectedOrder.items?.map((item) => (

                  <div
                    className="modal-item"
                    key={item._id}
                  >

                    <div>

                      <strong>
                        {item.menuItem?.name ||
                          "Food Item"}
                      </strong>

                      <p>
                        ₹{item.price} × {item.quantity}
                      </p>

                    </div>

                    <strong>
                      ₹{item.subtotal}
                    </strong>

                  </div>

                ))}

              </div>


              {/* Billing */}
              <div className="modal-billing">

                <div className="billing-row">

                  <span>Subtotal</span>

                  <span>
                    ₹
                    {selectedOrder.billing?.subtotal?.toFixed(
                      2
                    ) || "0.00"}
                  </span>

                </div>


                <div className="billing-row">

                  <span>Discount</span>

                  <span>
                    - ₹
                    {selectedOrder.billing?.discount?.toFixed(
                      2
                    ) || "0.00"}
                  </span>

                </div>


                <div className="billing-row">

                  <span>Tax</span>

                  <span>
                    ₹
                    {selectedOrder.billing?.tax?.toFixed(
                      2
                    ) || "0.00"}
                  </span>

                </div>


                <div className="billing-row total-row">

                  <strong>Total</strong>

                  <strong>
                    ₹
                    {selectedOrder.billing?.totalAmount?.toFixed(
                      2
                    ) || "0.00"}
                  </strong>

                </div>

              </div>

            </div>


            {/* Modal Footer */}
            <div className="order-modal-footer">

              <button
                className="modal-done"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                Done
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MyOrders;