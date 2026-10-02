import { useEffect, useState } from "react";
import { getAllPayments, approvePayment } from "../services/api";
import "../Admin_payments.css";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPayments() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllPayments();

      console.log("Payment data:", data);

      setPayments(data.payments || []);
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  async function handleApprove(paymentId) {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this cash payment?"
    );

    if (!confirmApprove) return;

    try {
      await approvePayment(paymentId);

      alert("Cash payment approved successfully");

      fetchPayments();
    } catch (error) {
      console.error("Approve payment error:", error);

      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="payment-loading">
        <h2>Loading Payments...</h2>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div className="admin-payments">

      <div className="payment-header">
        <div>
          <h1>Payment Management</h1>

          <p>
            Manage and verify cafe payments
          </p>
        </div>
      </div>

      {error && (
        <div className="payment-error">
          {error}
        </div>
      )}

      {payments.length === 0 ? (

        <div className="no-payments">
          <h3>No Payments Found</h3>

          <p>
            There are currently no payment records.
          </p>
        </div>

      ) : (

        <div className="payment-grid">

          {payments.map((payment) => (

            <div
              className="payment-card"
              key={payment._id}
            >

              <div className="payment-card-header">

                <div>
                  <h3>
                    Payment
                  </h3>

                  <small>
                    ID: {payment._id}
                  </small>
                </div>

                <span
                  className={
                    payment.paymentStatus === "success"
                      ? "payment-success"
                      : "payment-pending"
                  }
                >
                  {payment.paymentStatus}
                </span>

              </div>

              <div className="payment-details">

                <div className="payment-row">

                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {payment.paymentMethod}
                  </strong>

                </div>

                <div className="payment-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹{payment.subtotal}
                  </strong>

                </div>

                <div className="payment-row">

                  <span>
                    Tax
                  </span>

                  <strong>
                    ₹{payment.tax}
                  </strong>

                </div>

                <div className="payment-row">

                  <span>
                    Discount
                  </span>

                  <strong>
                    ₹{payment.discount}
                  </strong>

                </div>

                <div className="payment-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{payment.totalAmount}
                  </strong>

                </div>

              </div>

              {payment.paymentMethod === "cash" &&
              payment.paymentStatus === "pending" && (

                <button
                  className="approve-payment-btn"
                  onClick={() =>
                    handleApprove(payment._id)
                  }
                >
                  Approve Payment
                </button>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminPayments;