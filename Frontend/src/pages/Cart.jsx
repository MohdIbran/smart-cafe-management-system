import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [showTables, setShowTables] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  function updateQuantity(id, change) {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }

  function removeItem(id) {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item._id !== id
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }

  async function getTables() {
    try {
      const token = localStorage.getItem("customerToken");

      const response = await fetch(
        "http://localhost:2000/api/auth/customer/gettable",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Table fetch failed"
        );
      }

      setTables(data.alltable || []);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  async function placeOrder() {
    if (!selectedTable) {
      alert("Please select a table first");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      const token = localStorage.getItem("customerToken");

      if (!token) {
        alert("Please login as a customer first");
        navigate("/customer-login");
        return;
      }

      const orderItems = cart.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
      }));

      const response = await fetch(
        `http://localhost:2000/api/auth/createorder/${selectedTable}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: orderItems,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Order creation failed"
        );
      }

      alert("Order placed successfully! 🎉");

     localStorage.removeItem("cart");
setCart([]);

setSelectedTable("");
setShowTables(false);

navigate("/payment", {
  state: {
    orderId: data.order._id
  }
});
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setPlacingOrder(false);
    }
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="cart-page">

      {/* Navbar */}
      <nav className="cart-navbar">

        <div className="cart-brand">

          <span>☕</span>

          <div>
            <h2>
              Smart <strong>Cafe</strong>
            </h2>

            <small>
              Fresh • Tasty • Smart
            </small>
          </div>

        </div>

        <a
          href="/customer-menu"
          className="back-menu"
        >
          ← Continue Shopping
        </a>

      </nav>

      {/* Main */}
      <main className="cart-container">

        <div className="cart-heading">

          <p>YOUR ORDER</p>

          <h1>Shopping Cart</h1>

          <span>
            {totalItems} items in your cart
          </span>

        </div>

        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some delicious food from our menu.
            </p>

            <a href="/customer-menu">
              Explore Menu
            </a>

          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Items */}
            <section className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item._id}
                >

                  <div className="cart-item-image">

                    <img
  src={
    item.imageurl
      ? `http://localhost:2000${item.imageurl}`
      : "/default-food.jpg"
  }
  alt={item.name}
/>

                  </div>

                  <div className="cart-item-info">

                    <span className="cart-category">

                      {item.category === "coffe"
                        ? "Coffee"
                        : item.category}

                    </span>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    <strong>
                      ₹{item.price}
                    </strong>

                  </div>

                  <div className="quantity-box">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          -1
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <div className="item-total">

                    <strong>
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>

                    <button
                      className="remove-item"
                      onClick={() =>
                        removeItem(item._id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </section>

            {/* Summary */}
            <aside className="cart-summary">

              <h2>
                Order Summary
              </h2>

              <div className="summary-row">

                <span>
                  Items
                </span>

                <span>
                  {totalItems}
                </span>

              </div>

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{subtotal.toFixed(2)}
                </span>

              </div>

              <div className="summary-row">

                <span>
                  Tax (5%)
                </span>

                <span>
                  ₹{tax.toFixed(2)}
                </span>

              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{total.toFixed(2)}
                </strong>

              </div>

              {/* Proceed */}
              {!showTables ? (

                <button
                  className="checkout-button"
                  onClick={() => {
                    getTables();
                    setShowTables(true);
                  }}
                >
                  Proceed to Order →
                </button>

              ) : (

                <div className="table-selection">

                  <h3>
                    🪑 Select Your Table
                  </h3>

                  {tables.length === 0 ? (

                    <p>
                      No tables available.
                    </p>

                  ) : (

                    <div className="table-list">

                      {tables.map((table) => (

                        <button
                          key={table._id}
                          disabled={
                            table.status === true
                          }
                          className={
                            selectedTable ===
                            table._id
                              ? "selected-table"
                              : ""
                          }
                          onClick={() =>
                            setSelectedTable(
                              table._id
                            )
                          }
                        >

                          <strong>
                            Table{" "}
                            {table.tableNumber}
                          </strong>

                          <span>
                            {table.status === true
                              ? "Occupied"
                              : "Available"}
                          </span>

                        </button>

                      ))}

                    </div>

                  )}

                  {selectedTable && (

                    <div className="selected-table-info">

                      <p>
                        Selected Table:{" "}
                        <strong>
                          Table{" "}
                          {
                            tables.find(
                              (table) =>
                                table._id ===
                                selectedTable
                            )?.tableNumber
                          }
                        </strong>
                      </p>

                      <button
                        className="confirm-order-button"
                        onClick={placeOrder}
                        disabled={placingOrder}
                      >
                        {placingOrder
                          ? "Placing Order..."
                          : "✓ Confirm Order"}
                      </button>

                    </div>

                  )}

                </div>

              )}

              <p className="secure-text">
                🔒 Secure & reliable ordering
              </p>

            </aside>

          </div>

        )}

      </main>

    </div>
  );
}

export default Cart;