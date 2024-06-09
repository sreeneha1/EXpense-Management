import React, { useState, useEffect } from "react";
import Navigation from "../Components/Navigation"; // Ensure the correct path to Navigation component
import { Modal, Button } from "react-bootstrap"; // Import react-bootstrap components
import "../styles/inventory.css"; // Import custom CSS

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setTotal(price * qty);
  }, [price, qty]);

  useEffect(() => {
    checkLowStock();
  }, [users]);

  function handlePriceChange(e) {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
    }
  }

  function handleQuantityChange(e) {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
    }
  }

  function addToInventory() {
    const newProduct = { name, price, qty, sum: price * qty };
    if (isEditing) {
      const updatedUsers = users.map((product, index) =>
        index === editingIndex ? newProduct : product
      );
      setUsers(updatedUsers);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setUsers([...users, newProduct]);
    }
    setName("");
    setQty(0);
    setPrice(0);
  }

  function handleEdit(index) {
    const product = users[index];
    setName(product.name);
    setPrice(product.price);
    setQty(product.qty);
    setIsEditing(true);
    setEditingIndex(index);
  }

  function handleDelete(index) {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  }

  function checkLowStock() {
    const lowStockItems = users.filter(product => product.qty < 5);
    if (lowStockItems.length > 0) {
      const itemNames = lowStockItems.map(item => item.name).join(", ");
      setLowStockAlert(`Low stock alert: ${itemNames} has less than 5 units!`);
    } else {
      setLowStockAlert(""); // Clear the alert if no low stock items
    }
  }

  function refreshPage() {
    setUsers([]);
    setLowStockAlert("");
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function filterProducts(products) {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "all" || (filter === "lowStock" && product.qty < 5);
      return matchesSearch && matchesFilter;
    });
  }

  function handleShowModal(product) {
    setSelectedProduct(product);
    setShowModal(true);
  }

  const filteredUsers = filterProducts(users);

  return (
    <div className="inventory">
      <div className="navigation">
        <Navigation />
      </div>
      <div className="inventory-container container-fluid">
        <h1 className="text-center mb-4">Inventory Management System</h1>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card mb-4">
              <div className="card-header">Add Products</div>
              <div className="card-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Item Name:</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </td>
                      <td>Price:</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={price}
                          onChange={handlePriceChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Quantity:</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={qty}
                          onChange={handleQuantityChange}
                        />
                      </td>
                      <td>Total:</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={total}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4" className="text-center">
                        <button className="btn btn-add" type="button" onClick={addToInventory}>
                          {isEditing ? "Update" : "Add"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {lowStockAlert && (
              <div className="alert alert-warning">
                {lowStockAlert}
              </div>
            )}
            <div className="card mb-4">
              <div className="card-header">Products</div>
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="mb-3">
                  <select className="form-control" value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="lowStock">Low Stock</option>
                  </select>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <span
                            className="product-name"
                            onClick={() => handleShowModal(row)}
                            style={{ cursor: "pointer", color: "blue" }}
                          >
                            {row.name}
                          </span>
                        </td>
                        <td>{row.price}</td>
                        <td>{row.qty}</td>
                        <td>{row.sum}</td>
                        <td>
                          <button className="btn btn-primary btn-spacing" onClick={() => handleEdit(index)}>Edit</button>
                          <button className="btn btn-danger btn-spacing" onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Quantity:</strong> {selectedProduct.qty}</p>
            <p><strong>Total:</strong> ${selectedProduct.sum}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Inventory;