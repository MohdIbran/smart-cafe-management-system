import { useEffect, useState } from "react";
import "../Admin_tables.css";

import {
  getAllTables,
  createTable,
  updateTable,
  deleteTable,
} from "../services/api";

function AdminTables() {
  const [tables, setTables] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const [editTableId, setEditTableId] = useState(null);

  async function fetchTables() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllTables();

      

      setTables(data.alltable || []);
    } catch (error) {
      console.error("Table fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTables();
  }, []);

  function handleAddTable() {
    setEditTableId(null);
    setTableNumber("");
    setCapacity("");
    setShowForm(true);
  }

  function handleEdit(table) {
  console.log("EDIT TABLE:", table);

  setEditTableId(table._id);
  setTableNumber(String(table.tableNumber));
  setCapacity(String(table.capacity));
  setShowForm(true);
}
  function handleCancel() {
    setShowForm(false);
    setEditTableId(null);
    setTableNumber("");
    setCapacity("");
  }

  async function handleSubmit() {
    try {
      if (!tableNumber || !capacity) {
        alert("Please fill all fields");
        return;
      }

      const tableData = {
  tableNumber: Number(tableNumber),
  capacity: Number(capacity),
  status: false,
};
      if (editTableId) {
        await updateTable(editTableId, tableData);
        alert("Table updated successfully");
      } else {
        await createTable(tableData);
        alert("Table created successfully");
      }

      handleCancel();
      fetchTables();

    } catch (error) {
      console.error("Table save error:", error);
      alert(error.message);
    }
  }

  async function handleDelete(tableId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTable(tableId);

      alert("Table deleted successfully");

      fetchTables();

    } catch (error) {
      console.error("Table delete error:", error);
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="table-loading">
        <h2>Loading Tables...</h2>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div className="admin-tables">

      {/* Header */}

      <div className="table-header">

        <div>
          <h1>Table Management</h1>

          <p>
            Manage cafe tables and their availability
          </p>
        </div>

        <button
          className="add-table-btn"
          onClick={handleAddTable}
        >
          + Add Table
        </button>

      </div>


      {/* Error */}

      {error && (
        <div className="table-error">
          {error}
        </div>
      )}


      {/* Add / Edit Form */}

      {showForm && (
        <div className="table-form">

          <div className="form-header">

            <div>
              <h2>
                {editTableId
                  ? "Edit Table"
                  : "Add New Table"}
              </h2>

              <p>
                Enter table details below
              </p>
            </div>

          </div>


          <div className="form-fields">

            <div className="form-group">

              <label>
                Table Number
              </label>

              <input
                type="number"
                placeholder="Enter table number"
                value={tableNumber}
                onChange={(e) =>
                  setTableNumber(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Capacity
              </label>

              <input
                type="number"
                placeholder="Number of seats"
                value={capacity}
                onChange={(e) =>
                  setCapacity(e.target.value)
                }
              />

            </div>

          </div>


          <div className="form-buttons">

            <button
              className="save-table-btn"
              onClick={handleSubmit}
            >
              {editTableId
                ? "Update Table"
                : "Create Table"}
            </button>

            <button
              className="cancel-table-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>

        </div>
      )}


      {/* Table Summary */}

      <div className="table-summary">

        <div className="summary-card">

          <div className="summary-icon">
            🪑
          </div>

          <div>
            <p>Total Tables</p>
            <h2>{tables.length}</h2>
          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon occupied-icon">
            🔴
          </div>

          <div>
            <p>Occupied</p>

            <h2>
              {
                tables.filter(
                  (table) => table.status === true
                ).length
              }
            </h2>

          </div>

        </div>


        <div className="summary-card">

          <div className="summary-icon available-icon">
            🟢
          </div>

          <div>
            <p>Available</p>

            <h2>
              {
                tables.filter(
                  (table) => table.status !== true
                ).length
              }
            </h2>

          </div>

        </div>

      </div>


      {/* Tables */}

      {tables.length === 0 ? (

        <div className="no-tables">

          <div className="no-table-icon">
            🪑
          </div>

          <h2>
            No Tables Found
          </h2>

          <p>
            Add your first cafe table to get started.
          </p>

          <button
            onClick={handleAddTable}
            className="add-first-table-btn"
          >
            + Add Table
          </button>

        </div>

      ) : (

        <div className="table-grid">

          {tables.map((table) => {

            const occupied = table.status === true;

            return (

              <div
                className="table-card"
                key={table._id}
              >

                {/* Card Top */}

                <div className="table-card-top">

                  <div className="table-number">

                    <span>
                      Table
                    </span>

                    <strong>
                      #{table.tableNumber}
                    </strong>

                  </div>


                  <span
                    className={
                      occupied
                        ? "occupied-badge"
                        : "available-badge"
                    }
                  >

                    {occupied
                      ? "Occupied"
                      : "Available"}

                  </span>

                </div>


                {/* Table Image */}

                <div className="table-icon-large">
                  🪑
                </div>


                {/* Details */}

                <div className="table-details">

                  <div className="table-detail">

                    <span>
                      👥
                    </span>

                    <div>
                      <small>
                        Capacity
                      </small>

                      <strong>
                        {table.capacity} Seats
                      </strong>
                    </div>

                  </div>


                  <div className="table-detail">

                    <span>
                      {occupied
                        ? "🔴"
                        : "🟢"}
                    </span>

                    <div>

                      <small>
                        Status
                      </small>

                      <strong>
                        {occupied
                          ? "Currently occupied"
                          : "Ready for customers"}
                      </strong>

                    </div>

                  </div>

                </div>


                {/* Actions */}

                <div className="table-actions">

                 <button
  type="button"
  className="edit-table-btn"
  onClick={() => handleEdit(table)}
>
  Edit
</button>


                  <button
                    className="delete-table-btn"
                    onClick={() =>
                      handleDelete(table._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default AdminTables;
