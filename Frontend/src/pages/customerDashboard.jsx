import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customerAI } from "../services/api";
import "../customerDashboard.css";


function CustomerDashboard() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);

  const [customer] = useState(() => {
    const savedCustomer = localStorage.getItem("customer");
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });

  // ================================
  // GET CUSTOMER ORDERS
  // ================================

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem("customerToken");

        const response = await fetch(
          "http://localhost:2000/api/auth/getMyOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.log("Orders error:", error.message);
      }
    };

    getOrders();
  }, []);

  // ================================
  // TOTAL ORDERS
  // ================================

  const totalOrders = orders.length;

  // ================================
  // TOTAL SPENT
  // ================================

  const totalSpent = orders.reduce((total, order) => {
    return total + (order.billing?.totalAmount || 0);
  }, 0);

  // ================================
  // FAVORITE ITEM
  // ================================

  const itemCount = {};

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      const name = item.menuItem?.name;

      if (name) {
        itemCount[name] =
          (itemCount[name] || 0) + (item.quantity || 0);
      }
    });
  });

  let favoriteItem = "No orders yet";

  Object.keys(itemCount).forEach((item) => {
    if (
      favoriteItem === "No orders yet" ||
      itemCount[item] > itemCount[favoriteItem]
    ) {
      favoriteItem = item;
    }
  });

  // ================================
  // MEMBER SINCE
  // ================================

  const memberSince = customer?.createdAt
    ? new Date(customer.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  // ================================
  // AI
  // ================================

  const askAI = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const data = await customerAI(userQuestion);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: error.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // STATUS CLASS
  // ================================

  const getStatusClass = (status) => {
    if (status === "served") return "served";
    if (status === "preparing") return "preparing";
    if (status === "confirmed") return "confirmed";
    if (status === "cancelled") return "cancelled";

    return "pending";
  };

  return (
    <div className="smart-cafe-dashboard">

      {/* =================================
          SIDEBAR
      ================================= */}

      <aside className="cafe-sidebar">

        <div className="cafe-logo">

          <div className="logo-icon">
            ☕
          </div>

          <div>
            <h2>Smart Cafe</h2>
            <span>Good Food • Better Mood</span>
          </div>

        </div>

        <nav className="sidebar-menu">

          <button className="active">
            🏠
            <span>Dashboard</span>
          </button>

          <button
            onClick={() =>
              (window.location.href = "/customer-menu")
            }
          >
            🍴
            <span>Menu</span>
          </button>

          <button
            onClick={() =>
              (window.location.href = "/my-orders")
            }
          >
            🛍️
            <span>My Orders</span>
          </button>

          
<button
  onClick={() => navigate("/customer-profile")}
>
  👤
  <span>Profile</span>
</button>


          <button
            onClick={() => {
              localStorage.removeItem("customerToken");
              localStorage.removeItem("customer");

              window.location.href = "/customer-login";
            }}
          >
            🚪
            <span>Logout</span>
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div>☕</div>

          <p>
            Life Begins
            <br />
            After Coffee ❤️
          </p>

        </div>

      </aside>


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main className="cafe-main">

        {/* HEADER */}

        <header className="cafe-topbar">

          <div className="welcome-area">

            <div className="customer-big-avatar">
              {customer?.name?.charAt(0).toUpperCase() || "C"}
            </div>

            <div>

              <h1>
                Hello, {customer?.name || "Customer"} 👋
              </h1>

              <p>
                Welcome back to Smart Cafe!
              </p>

              <small>
                Good food, great vibes, always! ☕
              </small>

            </div>

          </div>


          <div className="topbar-right">

            <div className="search-box">
              🔍
              <input
                placeholder="Search menu, food or drink..."
              />
            </div>

            <div className="notification">
              🔔
              <span>2</span>
            </div>

            <div className="top-profile">

              <div className="small-avatar">
                {customer?.name?.charAt(0).toUpperCase() || "C"}
              </div>

              <strong>
                {customer?.name || "Customer"}
              </strong>

              <span>⌄</span>

            </div>

          </div>

        </header>


        {/* =================================
            DASHBOARD BODY
        ================================= */}

        <div className="dashboard-grid">

          <div className="dashboard-left">

            {/* STATS */}

            <section className="customer-stats">

              <div className="stat-card pink-card">

                <div className="stat-icon">
                  🍔
                </div>

                <span>Total Orders</span>

                <h2>{totalOrders}</h2>

                <p>
                  View your order history
                </p>

              </div>


              <div className="stat-card green-card">

                <div className="stat-icon">
                  💳
                </div>

                <span>Total Spent</span>

                <h2>
                  ₹{totalSpent.toLocaleString("en-IN")}
                </h2>

                <p>
                  All time spending
                </p>

              </div>


              <div className="stat-card blue-card">

                <div className="stat-icon">
                  ⭐
                </div>

                <span>Favorite Item</span>

                <h2>
                  {favoriteItem}
                </h2>

                <p>
                  Your top choice
                </p>

              </div>


              <div className="stat-card purple-card">

                <div className="stat-icon">
                  ❤️
                </div>

                <span>Member Since</span>

                <h2>
                  {memberSince}
                </h2>

                <p>
                  Thanks for being with us!
                </p>

              </div>

            </section>


            {/* FOOD BANNER */}

            <section className="food-banner">

              <div className="banner-content">

                <span>
                  FRESH INGREDIENTS • GREAT TASTE • ALWAYS
                </span>

                <h2>
                  Craving Something?
                </h2>

                <p>
                  Explore our delicious menu and place your next order!
                </p>

                <button
                  onClick={() =>
                    (window.location.href = "/customer-menu")
                  }
                >
                  🍴 View Menu →
                </button>

              </div>

              <div className="banner-food">
                🍔
              </div>

            </section>


            {/* RECENT ORDERS */}

            <section className="recent-orders">

              <div className="section-heading">

                <div>
                  <span className="heading-icon">
                    🛍️
                  </span>

                  <h2>
                    Recent Orders
                  </h2>
                </div>

                <button
                  onClick={() =>
                    (window.location.href = "/my-orders")
                  }
                >
                  View All Orders →
                </button>

              </div>


              <div className="orders-list">

                {orders.length === 0 ? (

                  <div className="empty-orders">
                    <div>☕</div>
                    <h3>No orders yet</h3>
                    <p>
                      Place your first delicious order!
                    </p>
                  </div>

                ) : (

                  orders.slice(0, 3).map((order) => {

                    const firstItem = order.items?.[0];

                    return (
                      <div
                        className="recent-order"
                        key={order._id}
                      >

                       <div className="order-food-image">
  {firstItem?.menuItem?.imageurl ? (
    <img
      src={
        firstItem.menuItem.imageurl.startsWith("http")
          ? firstItem.menuItem.imageurl
          : `http://localhost:2000${firstItem.menuItem.imageurl}`
      }
      alt={firstItem.menuItem.name}
    />
  ) : (
    <span>🍔</span>
  )}
</div>


                        <div className="order-info">

                          <strong>
                            Order #{order.orderNumber}
                          </strong>

                          <div className="order-meta">

                            <span>
                              📅{" "}
                              {new Date(
                                order.createdAt
                              ).toLocaleDateString("en-IN")}
                            </span>

                            <span>
                              🍽️ Table{" "}
                              {order.table?.tableNumber || "-"}
                            </span>

                          </div>

                        </div>


                        <span
                          className={`order-status ${getStatusClass(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>


                        <strong className="order-price">
                          ₹
                          {order.billing?.totalAmount || 0}
                        </strong>

                        <span className="order-arrow">
                          →
                        </span>

                      </div>
                    );
                  })

                )}

              </div>

            </section>


            {/* AI ASSISTANT */}

            <section className="ai-section">

              <div className="ai-header">

                <div className="ai-title">

                  <div className="ai-icon">
                    🤖
                  </div>

                  <div>
                    <h2>
                      Cafe AI Assistant
                    </h2>

                    <p>
                      Your personal Smart Cafe helper
                    </p>
                  </div>

                </div>

                <span className="online-badge">
                  ● Online
                </span>

              </div>


              <div className="chat-messages">

                {messages.length === 0 && (

                  <div className="ai-welcome">

                    <div className="big-ai-icon">
                      ☕
                    </div>

                    <h3>
                      How can I help you?
                    </h3>

                    <p>
                      Ask me about your order, bill, menu or food.
                    </p>

                    <div className="suggestion-buttons">

                      <button
                        onClick={() =>
                          setQuestion(
                            "mera order status kya hai?"
                          )
                        }
                      >
                        📦 Order Status
                      </button>

                      <button
                        onClick={() =>
                          setQuestion(
                            "maine kya order kiya hai?"
                          )
                        }
                      >
                        🛒 My Order
                      </button>

                      <button
                        onClick={() =>
                          setQuestion(
                            "mera total bill kitna hai?"
                          )
                        }
                      >
                        💰 My Bill
                      </button>

                      <button
                        onClick={() =>
                          setQuestion(
                            "mujhe pizza khana hai, available pizza batao"
                          )
                        }
                      >
                        🍕 Available Pizza
                      </button>

                    </div>

                  </div>

                )}


                {messages.map((message, index) => (

                  <div
                    key={index}
                    className={
                      message.type === "user"
                        ? "chat-message user-chat"
                        : "chat-message ai-chat"
                    }
                  >

                    <div className="chat-avatar">
                      {message.type === "user"
                        ? "👤"
                        : "🤖"}
                    </div>

                    <div className="chat-text">
                      {message.text}
                    </div>

                  </div>

                ))}


                {loading && (

                  <div className="chat-message ai-chat">

                    <div className="chat-avatar">
                      🤖
                    </div>

                    <div className="chat-text">
                      AI is thinking...
                    </div>

                  </div>

                )}

              </div>


              <div className="ai-input-area">

                <input
                  type="text"
                  placeholder="Ask about your order, bill or menu..."
                  value={question}
                  onChange={(e) =>
                    setQuestion(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      askAI();
                    }
                  }}
                />

                <button
                  onClick={askAI}
                  disabled={loading}
                >
                  {loading ? "..." : "Send ➤"}
                </button>

              </div>

            </section>

          </div>


          {/* =================================
              RIGHT SIDEBAR
          ================================= */}

          <aside className="dashboard-right">

            <section className="quick-section">

              <h2>
                Quick Actions
              </h2>


              <button
                onClick={() =>
                  (window.location.href = "/customer-menu")
                }
              >

                <span className="quick-icon orange">
                  🍴
                </span>

                <div>
                  <strong>
                    Browse Menu
                  </strong>

                  <p>
                    Explore our delicious items
                  </p>
                </div>

                <b>›</b>

              </button>


              <button
                onClick={() =>
                  (window.location.href = "/cart")
                }
              >

                <span className="quick-icon green">
                  🛍️
                </span>

                <div>
                  <strong>
                    Place Order
                  </strong>

                  <p>
                    Order your favorite food
                  </p>
                </div>

                <b>›</b>

              </button>


              <button
                onClick={() =>
                  (window.location.href = "/my-orders")
                }
              >

                <span className="quick-icon purple">
                  👤
                </span>

                <div>
                  <strong>
                    View My Orders
                  </strong>

                  <p>
                    Track your order status
                  </p>
                </div>

                <b>›</b>

              </button>

            </section>


            {/* HELP */}

            <section className="help-card">

              <div className="help-icon">
                ☕
              </div>

              <h2>
                Need Help?
              </h2>

              <p>
                Have any questions or need assistance?
                We're here to help!
              </p>

              <button>
                💬 Contact Us
              </button>

            </section>


            {/* RIGHT FOOTER */}

            <div className="right-footer">

              <div>
                ☕
              </div>

              <p>
                Thank you
                <br />
                for choosing
                <br />
                <strong>Smart Cafe</strong> ❤️
              </p>

            </div>

          </aside>

        </div>


        {/* FOOTER */}

        <footer className="cafe-footer">
          ☕ Thank you for choosing{" "}
          <strong>Smart Cafe</strong> ❤️
        </footer>

      </main>

    </div>
  );
}

export default CustomerDashboard;