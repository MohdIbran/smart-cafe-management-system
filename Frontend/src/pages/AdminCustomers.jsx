import { useEffect, useState } from "react";
import { getAllCustomers } from "../services/api";
import "./admin_customers.css";

function AdminCustomers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {

      const data = await getAllCustomers();

      setCustomers(data.customers || []);

    } catch (error) {

      console.log("CUSTOMERS ERROR:", error);

    } finally {

      setLoading(false);

    }
  }

  if (loading) {
    return (
      <div className="customers-loading">
        <h2>Loading Customers...</h2>
      </div>
    );
  }

  return (
    <div className="admin-customers-page">

      {/* Header */}
      <header className="customers-header">

        <div>
          <h1>Customers</h1>

          <p>
            Manage your cafe customers
          </p>
        </div>

        <div className="customers-count">
          👥 {customers.length} Customers
        </div>

      </header>


      {/* Customers */}
      <section className="customers-card">

        {customers.length === 0 ? (

          <div className="no-customers">

            <div>👥</div>

            <h2>
              No Customers Found
            </h2>

            <p>
              There are currently no registered customers.
            </p>

          </div>

        ) : (

          <div className="customers-table-wrapper">

            <table className="customers-table">

              <thead>

                <tr>

                  <th>Customer</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Table</th>

                  <th>Orders</th>

                  <th>Total Spent</th>

                  <th>Address</th>

                </tr>

              </thead>


              <tbody>

                {customers.map((customer) => (

                  <tr key={customer._id}>

                    {/* Customer */}
                    <td>

                      <div className="customer-name">

                        <div className="customer-avatar">

                          {customer.name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                        <div className="customer-info">

                          <strong>
                            {customer.name || "Unknown"}
                          </strong>

                          <span>
                            Customer
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* Email */}
                    <td>
                      {customer.email || "—"}
                    </td>


                    {/* Phone */}
                    <td>
                      {customer.phone || "—"}
                    </td>


                    {/* Table */}
                    <td>

                      {customer.tableNumber
                        ? (
                          <span className="table-badge">
                            🪑 Table {customer.tableNumber}
                          </span>
                        )
                        : (
                          <span className="no-table">
                            No table
                          </span>
                        )}

                    </td>


                    {/* Orders */}
                    <td>

                      <span className="orders-badge">
                        🧾 {customer.totalOrders || 0}
                      </span>

                    </td>


                    {/* Total Spent */}
                    <td>

                      <strong className="customer-spent">
                        ₹{customer.totalSpent || 0}
                      </strong>

                    </td>


                    {/* Address */}
                    <td>
                      {customer.address || "—"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
}

export default AdminCustomers;