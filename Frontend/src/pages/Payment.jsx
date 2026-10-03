import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  // API URL from environment
  const API_URL = import.meta.env.VITE_API_URL;

  // Get current order
  useEffect(() => {
    async function getOrder() {
      try {
        const token = localStorage.getItem("customerToken");

        if (!token) {
          alert("Please login as a customer first");
          navigate("/customer-login");
          return;
        }

        const response = await fetch(
          `${API_URL}/getMyOrders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Orders not found");
        }

        const currentOrder = data.orders.find(
          (item) => item._id === orderId
        );

        if (!currentOrder) {
          throw new Error("Current order not found");
        }

        setOrder(currentOrder);
      } catch (error) {
        console.log(error);
        alert(error.message);
      } finally {
        setLoadingOrder(false);
      }
    }

    if (orderId) {
      getOrder();
    } else {
      setLoadingOrder(false);
    }
  }, [orderId, navigate, API_URL]);


  // Payment function
  async function handlePayment() {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (!orderId) {
      alert("Order ID not found");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("customerToken");

      if (!token) {
        alert("Please login as a customer first");
        navigate("/customer-login");
        return;
      }

      let paymentStatus = "pending";

      // Card and UPI payment success
      if (
        paymentMethod === "upi" ||
        paymentMethod === "card"
      ) {
        paymentStatus = "success";
      }

      const response = await fetch(
        `${API_URL}/payment/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentMethod,
            paymentStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      alert(data.message);

      navigate("/my-orders");

    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }


  // Payment status
  const paymentStatus =
    order?.payment?.paymentStatus || "pending";

  const formattedPaymentStatus =
    paymentStatus.charAt(0).toUpperCase() +
    paymentStatus.slice(1);


  return (
    <div className="payment-page">

      <div className="payment-container">

        {/* Header */}
        <div className="payment-header">

          <div>
            <p className="payment-small-title">
              CAFE CHECKOUT
            </p>

            <h1>Complete Your Payment</h1>

            <p>
              Choose your preferred payment method
            </p>
          </div>

          <div className="secure-payment">
            🔒 Secure Payment
          </div>

        </div>


        <div className="payment-content">

          {/* Payment Methods */}
          <div className="payment-method-section">

            <h2>Payment Method</h2>

            <div className="payment-options">

              {/* UPI */}
              <div
                className={`payment-card ${
                  paymentMethod === "upi"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("upi")
                }
              >

                <div className="payment-icon">
                  📱
                </div>

                <div>
                  <h3>UPI</h3>
                  <p>
                    Google Pay, PhonePe, Paytm
                  </p>
                </div>

                <div className="radio-circle">
                  {paymentMethod === "upi" && "✓"}
                </div>

              </div>


              {/* Card */}
              <div
                className={`payment-card ${
                  paymentMethod === "card"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("card")
                }
              >

                <div className="payment-icon">
                  💳
                </div>

                <div>
                  <h3>Credit / Debit Card</h3>
                  <p>
                    Visa, Mastercard and more
                  </p>
                </div>

                <div className="radio-circle">
                  {paymentMethod === "card" && "✓"}
                </div>

              </div>


              {/* Cash */}
              <div
                className={`payment-card ${
                  paymentMethod === "cash"
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("cash")
                }
              >

                <div className="payment-icon">
                  💵
                </div>

                <div>
                  <h3>Cash</h3>
                  <p>
                    Pay at the cafe counter
                  </p>
                </div>

                <div className="radio-circle">
                  {paymentMethod === "cash" && "✓"}
                </div>

              </div>

            </div>


            <div className="payment-security">
              🔐 Your payment information is securely
              processed.
            </div>

          </div>


          {/* Order Summary */}
          <div className="order-summary">

            <h2>Order Summary</h2>


            <div className="summary-row">
              <span>Order ID</span>

              <span>
                #{orderId?.slice(-6)}
              </span>
            </div>


            <div className="summary-line"></div>


            <div className="summary-row">

              <span>Order Status</span>

              <span className="pending-text">
                {order?.orderStatus
                  ? order.orderStatus
                      .charAt(0)
                      .toUpperCase() +
                    order.orderStatus.slice(1)
                  : "Pending"}
              </span>

            </div>


            <div className="summary-line"></div>


            <div className="summary-row">

              <span>Payment Status</span>

              <span
                className={
                  paymentStatus === "success"
                    ? "success-text"
                    : paymentStatus === "failed"
                    ? "failed-text"
                    : "pending-text"
                }
              >

                {loadingOrder
                  ? "Loading..."
                  : formattedPaymentStatus}

              </span>

            </div>


            <div className="summary-line"></div>


            <div className="total-row">

              <span>Total Amount</span>

              <strong>
                {loadingOrder
                  ? "Loading..."
                  : `₹${
                      order?.billing?.totalAmount?.toFixed(
                        2
                      ) || "0.00"
                    }`}
              </strong>

            </div>


            {/* Pay Button */}
            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={loading}
            >

              {loading
                ? "Processing Payment..."
                : "Pay Now →"}

            </button>


            {/* Back Button */}
            <button
              className="back-button"
              onClick={() =>
                navigate("/cart")
              }
            >
              ← Back to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;