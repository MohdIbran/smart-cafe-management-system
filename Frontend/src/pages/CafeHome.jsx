import { useNavigate } from "react-router-dom";
import "./cafe_home.css";

function CafeHome() {
  const navigate = useNavigate();

  return (
    <div className="cafe-home">

      {/* ================= NAVBAR ================= */}
      <header className="cafe-navbar">

        <div
          className="cafe-brand"
          onClick={() => navigate("/cafe")}
        >
          <div className="brand-icon">☕</div>

          <div className="brand-text">
            <h2>Smart Cafe</h2>
            <span>Good Food • Better Mood</span>
          </div>
        </div>

        <nav className="cafe-nav-links">
          <button onClick={() => navigate("/cafe")}>
            Home
          </button>

          <button onClick={() => navigate("/customer-login")}>
            Menu
          </button>

          <button onClick={() => navigate("/customer-login")}>
            My Orders
          </button>
        </nav>

        <div className="cafe-nav-actions">

          <button
            className="signup-btn"
            onClick={() => navigate("/customer-register")}
          >
            Sign Up
          </button>

          <button
            className="customer-login-btn"
            onClick={() => navigate("/customer-login")}
          >
            Customer Login
          </button>

          <button
            className="admin-login-btn"
            onClick={() => navigate("/login")}
          >
            Admin Login
          </button>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section className="hero-section">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <div className="hero-badge">
              ☕ Welcome to Smart Cafe
            </div>

            <h1>
              Great Food.
              <br />
              <span>Great Moments.</span>
            </h1>

            <p>
              Discover delicious food, choose your table,
              place your order and enjoy a smarter cafe
              experience from start to finish.
            </p>

            <div className="hero-actions">

              <button
                className="hero-primary-btn"
                onClick={() => navigate("/customer-register")}
              >
                Explore Menu
                <span>→</span>
              </button>

              <button
                className="hero-secondary-btn"
                onClick={() => navigate("/customer-login")}
              >
                Customer Login
              </button>

            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <strong>Fresh</strong>
                <span>Ingredients</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>Easy</strong>
                <span>Ordering</span>
              </div>

              <div className="trust-divider"></div>

              <div className="trust-item">
                <strong>Secure</strong>
                <span>Payments</span>
              </div>

            </div>

          </div>


          {/* HERO CARD */}
          <div className="hero-food-card">

            <div className="food-card-label">
              <span>Today's Special</span>
              <strong>⭐ 4.9</strong>
            </div>

            <div className="food-visual">
              <div className="food-glow"></div>
              <div className="food-emoji">🍕</div>
            </div>

            <div className="food-card-content">
              <span>Chef's Recommendation</span>
              <h3>Signature Pizza</h3>

              <div className="food-card-bottom">
                <strong>₹249</strong>

                <button
                  onClick={() => navigate("/customer-login")}
                >
                  Order Now →
                </button>
              </div>
            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}
        <section className="features-section">

          <div className="section-heading">

            <span>WHY SMART CAFE</span>

            <h2>
              Everything you need
              <br />
              for a better cafe experience
            </h2>

            <p>
              Simple ordering, comfortable dining and
              seamless payment — all in one place.
            </p>

          </div>


          <div className="features-grid">

            <div className="feature-card">

              <div className="feature-icon">🍽️</div>

              <h3>Fresh & Delicious</h3>

              <p>
                Enjoy carefully prepared food and beverages
                made for great taste.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">🪑</div>

              <h3>Choose Your Table</h3>

              <p>
                See available tables and select the one
                that works best for you.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">🛒</div>

              <h3>Easy Ordering</h3>

              <p>
                Browse the menu, add your favourites and
                place your order in a few clicks.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon">💳</div>

              <h3>Secure Payment</h3>

              <p>
                Choose Cash, UPI or Card and complete
                your payment easily.
              </p>

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="steps-section">

          <div className="section-heading center-heading">

            <span>HOW IT WORKS</span>

            <h2>
              Your order, made simple
            </h2>

            <p>
              From choosing food to tracking your order,
              everything is simple.
            </p>

          </div>


          <div className="steps-grid">

            <div className="step-card">

              <div className="step-number">01</div>

              <div className="step-icon">👤</div>

              <h3>Create Account</h3>

              <p>
                Sign up as a customer and create your
                Smart Cafe account.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">02</div>

              <div className="step-icon">🍕</div>

              <h3>Choose Food</h3>

              <p>
                Explore our menu and add your favourite
                items to your cart.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">03</div>

              <div className="step-icon">🪑</div>

              <h3>Select Table</h3>

              <p>
                Select an available table before
                confirming your order.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">04</div>

              <div className="step-icon">📦</div>

              <h3>Track Order</h3>

              <p>
                Complete payment and follow your order
                status from your dashboard.
              </p>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="cta-section">

          <div className="cta-content">

            <span>YOUR TABLE IS WAITING ☕</span>

            <h2>
              Ready for something delicious?
            </h2>

            <p>
              Create your customer account and start
              your Smart Cafe experience today.
            </p>

            <div className="cta-buttons">

              <button
                onClick={() => navigate("/customer-register")}
              >
                Create Customer Account →
              </button>

              <button
                className="cta-login"
                onClick={() => navigate("/customer-login")}
              >
                Customer Login
              </button>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="cafe-footer">

        <div className="footer-brand">

          <div className="footer-logo">
            ☕
          </div>

          <div>
            <h3>Smart Cafe</h3>
            <p>Good Food • Better Mood</p>
          </div>

        </div>

        <p className="copyright">
          © 2026 Smart Cafe Management System
        </p>

        <button
          className="footer-admin-btn"
          onClick={() => navigate("/login")}
        >
          Admin Login
        </button>

      </footer>

    </div>
  );
}

export default CafeHome;

