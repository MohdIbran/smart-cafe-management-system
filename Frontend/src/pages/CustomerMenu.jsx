import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerMenu.css";

function CustomerMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // =========================
  // BACKEND URL
  // =========================
  const API_URL = import.meta.env.VITE_API_URL;
  const BACKEND_URL = API_URL.replace("/api/auth", "");

  // =========================
  // CATEGORY IMAGES
  // =========================
  const categoryImages = {
    pizza:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",

    burger:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",

    tea:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",

    coffee:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",

    coffe:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",

    dessert:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",

    others:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  };

  // =========================
  // GET MENU
  // =========================
  async function getMenu() {
    try {
      const response = await fetch(
        `${API_URL}/getmenu?isAvailable=true`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Menu fetch failed");
      }

      setMenu(data.data || []);
    } catch (error) {
      console.error("MENU FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // ADD TO CART
  // =========================
  function addToCart(item) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  }

  // =========================
  // LOAD MENU
  // =========================
  useEffect(() => {
    getMenu();
  }, []);

  // =========================
  // SAVE CART
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =========================
  // CATEGORIES
  // =========================
  const categories = [
    "all",
    "pizza",
    "burger",
    "tea",
    "coffe",
    "dessert",
    "others",
  ];

  const filteredMenu =
    selectedCategory === "all"
      ? menu
      : menu.filter(
          (item) => item.category === selectedCategory
        );

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="menu-loading">
        <div className="loader"></div>
        <p>Loading delicious food...</p>
      </div>
    );
  }

  return (
    <div className="customer-menu-page">

      {/* ================= NAVBAR ================= */}
      <nav className="menu-navbar">

        <div className="brand">
          <span className="brand-icon">☕</span>

          <div>
            <h2>
              Smart <span>Cafe</span>
            </h2>

            <small>Fresh • Tasty • Smart</small>
          </div>
        </div>

        <div className="nav-links">

          <a href="/customer-dashboard">
            Home
          </a>

          <a
            className="active"
            href="/customer-menu"
          >
            Menu
          </a>

          <a href="/my-orders">
            Orders
          </a>

          <a href="/customer-profile">
            Profile
          </a>

          <button
            className="cart-button"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart{" "}

            <span>
              {cart.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>
          </button>

        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="menu-hero">

        <div className="hero-content">

          <p className="hero-small">
            FRESH & DELICIOUS
          </p>

          <h1>
            Our <span>Menu</span>
          </h1>

          <p>
            Good food, good mood! Explore our
            freshly made dishes and beverages,
            crafted with love.
          </p>

          <button
            className="explore-button"
            onClick={() =>
              document
                .getElementById("menu-section")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Menu ↓
          </button>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
            alt="Cafe"
          />

          <div className="hero-badge">
            ☕ Freshly Made
          </div>

        </div>

      </section>

      {/* ================= MENU ================= */}
      <section
        className="menu-section"
        id="menu-section"
      >

        <div className="section-heading">

          <div>

            <p>
              WHAT'S ON THE TABLE
            </p>

            <h2>
              Choose Your Favourite
            </h2>

          </div>

          <span>
            {filteredMenu.length} items
          </span>

        </div>

        {/* ================= CATEGORIES ================= */}
        <div className="category-list">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-btn selected"
                  : "category-btn"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >

              {category === "all" && "🍽️"}

              {category === "pizza" && "🍕"}

              {category === "burger" && "🍔"}

              {category === "tea" && "🍵"}

              {category === "coffe" && "☕"}

              {category === "dessert" && "🍰"}

              {category === "others" && "🥗"}

              <span>
                {category === "coffe"
                  ? "Coffee"
                  : category.charAt(0).toUpperCase() +
                    category.slice(1)}
              </span>

            </button>

          ))}

        </div>

        {/* ================= MENU CARDS ================= */}

        {filteredMenu.length === 0 ? (

          <div className="empty-menu">

            <div>🍽️</div>

            <h3>
              No items available
            </h3>

            <p>
              Please try another category.
            </p>

          </div>

        ) : (

          <div className="menu-grid">

            {filteredMenu.map((item) => (

              <div
                className="food-card"
                key={item._id}
              >

                {/* FOOD IMAGE */}
                <div className="food-image">

                  <img
                    src={
                      item.imageurl
                        ? `${BACKEND_URL}${item.imageurl}`
                        : categoryImages[item.category] ||
                          categoryImages.others
                    }
                    alt={item.name}
                  />

                  <div className="category-tag">
                    {item.category === "coffe"
                      ? "Coffee"
                      : item.category}
                  </div>

                  <button
                    className="favorite-button"
                  >
                    ♡
                  </button>

                </div>

                {/* FOOD CONTENT */}
                <div className="food-content">

                  <div className="food-title">

                    <h3>
                      {item.name}
                    </h3>

                    <span>
                      ★ 4.8
                    </span>

                  </div>

                  <p className="food-description">
                    {item.description}
                  </p>

                  <div className="food-bottom">

                    <div className="price">
                      ₹{item.price}
                    </div>

                    <button
                      className="add-cart-button"
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      🛒 Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="menu-footer">

        <div>

          <h2>
            ☕ Smart Cafe
          </h2>

          <p>
            Fresh food. Great taste.
            Smart experience.
          </p>

        </div>

        <p>
          © 2026 Smart Cafe.
          All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default CustomerMenu;

