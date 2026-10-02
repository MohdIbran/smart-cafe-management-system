import { useEffect, useState } from "react";
import "../Admin_menu.css";
import {
  getAllMenu,
  deleteMenu,
  createMenu,
} from "../services/api";



function AdminMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [menuName, setMenuName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("others");
  const [isAvailable, setIsAvailable] = useState(true);

  // Selected image file
  const [image, setImage] = useState(null);

  // Image preview
  const [imagePreview, setImagePreview] = useState("");

  async function fetchMenu() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllMenu();

      console.log("Menu data:", data);

      setMenu(data.data || []);
    } catch (error) {
      console.error("Menu error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  // Select image
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setImage(null);
      setImagePreview("");
      return;
    }

    setImage(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  async function handleDelete(menuId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMenu(menuId);

      alert("Menu item deleted successfully");

      fetchMenu();
    } catch (error) {
      console.error("Delete menu error:", error);

      alert(error.message);
    }
  }

  async function handleCreateMenu() {
    try {
      if (!menuName || !description || !price) {
        alert("Please fill all fields");
        return;
      }

      const menuData = {
        name: menuName,
        description: description,
        price: Number(price),
        category: category,
        isAvailable: isAvailable,

        // Actual image file
        image: image,
      };

      console.log("Sending menu data:", menuData);

      await createMenu(menuData);

      alert("Menu item created successfully");

      // Reset form
      setMenuName("");
      setDescription("");
      setPrice("");
      setCategory("others");
      setIsAvailable(true);

      setImage(null);
      setImagePreview("");

      setShowForm(false);

      fetchMenu();
    } catch (error) {
      console.error("Create menu error:", error);

      alert(error.message);
    }
  }

  function handleCancel() {
    setShowForm(false);

    setMenuName("");
    setDescription("");
    setPrice("");
    setCategory("others");
    setIsAvailable(true);

    setImage(null);
    setImagePreview("");
  }

  if (loading) {
    return (
      <div className="menu-loading">
        <h2>Loading Menu...</h2>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div className="admin-menu">

      {/* Header */}
      <div className="menu-header">

        <div>
          <h1>Menu Management</h1>

          <p>
            Manage all cafe menu items
          </p>
        </div>

        <button
          type="button"
          className="add-menu-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Menu Item
        </button>

      </div>


      {/* Add Menu Form */}
      {showForm && (

        <div className="add-menu-form">

          <h2>
            Add Menu Item
          </h2>


          {/* Menu Name */}
          <input
            type="text"
            placeholder="Menu name"
            value={menuName}
            onChange={(e) =>
              setMenuName(e.target.value)
            }
          />


          {/* Description */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />


          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />


          {/* Category */}
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="burger">
              Burger
            </option>

            <option value="pizza">
              Pizza
            </option>

            <option value="tea">
              Tea
            </option>

            <option value="coffee">
              Coffee
            </option>

            <option value="dessert">
              Dessert
            </option>

            <option value="others">
              Others
            </option>
          </select>


          {/* Image Upload */}
          <div className="image-upload">

            <label>
              Menu Image
            </label>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
            />

          </div>


          {/* Image Preview */}
          {imagePreview && (

            <div className="image-preview">

              <p>
                Image Preview
              </p>

              <img
                src={imagePreview}
                alt="Menu Preview"
              />

            </div>

          )}


          {/* Available */}
          <label>

            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) =>
                setIsAvailable(e.target.checked)
              }
            />

            Available

          </label>


          {/* Create */}
          <button
            type="button"
            onClick={handleCreateMenu}
          >
            Create Menu
          </button>


          {/* Cancel */}
          <button
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

        </div>

      )}


      {/* Error */}
      {error && (
        <div className="menu-error">
          {error}
        </div>
      )}


      {/* No Menu */}
      {menu.length === 0 ? (

        <div className="no-menu">

          <h3>
            No Menu Items Found
          </h3>

          <p>
            There are currently no menu items available.
          </p>

        </div>

      ) : (

        <div className="menu-grid">

          {menu.map((item) => (

            <div
              className="menu-card"
              key={item._id}
            >

              {/* Menu Image */}
              <div className="menu-image">

                {item.imageurl ? (

                  <img
                    src={
                      item.imageurl.startsWith("http")
                        ? item.imageurl
                        : `http://localhost:2000${item.imageurl}`
                    }
                    alt={item.name}
                  />

                ) : (

                  <span>
                    🍽️
                  </span>

                )}

              </div>


              {/* Menu Content */}
              <div className="menu-content">

                <div className="menu-card-top">

                  <h2>
                    {item.name}
                  </h2>

                  <span
                    className={
                      item.isAvailable
                        ? "available-badge"
                        : "unavailable-badge"
                    }
                  >
                    {item.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </span>

                </div>


                {/* Description */}
                <p className="menu-description">

                  {item.description ||
                    "No description available"}

                </p>


                {/* Category + Price */}
                <div className="menu-details">

                  <span className="menu-category">
                    {item.category}
                  </span>

                  <strong className="menu-price">
                    ₹{item.price}
                  </strong>

                </div>


                {/* Actions */}
                <div className="menu-actions">

                  <button
                    className="edit-menu-btn"
                    onClick={() =>
                      console.log(
                        "Edit item:",
                        item._id
                      )
                    }
                  >
                    Edit
                  </button>


                  <button
                    className="delete-menu-btn"
                    onClick={() =>
                      handleDelete(item._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminMenu;

