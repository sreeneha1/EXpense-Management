import React, { useState, useEffect } from "react";
import Navigation from "../Components/Navigation"; // Ensure the correct path to Navigation component

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(-1);

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
    if (editIndex === -1) {
      const newProduct = { name, price, qty, sum: price * qty };
      setUsers([...users, newProduct]);
    } else {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { name, price, qty, sum: price * qty };
      setUsers(updatedUsers);
      setEditIndex(-1);
    }
    setName("");
    setQty(0);
    setPrice(0);
  }

  function editProduct(index) {
    const product = users[index];
    setName(product.name);
    setPrice(product.price);
    setQty(product.qty);
    setEditIndex(index);
  }

  function deleteProduct(index) {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
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
    window.location.reload();
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
      if (filter === "all") {
        return matchesSearch;
      } else if (filter === "lowStock") {
        return matchesSearch && product.qty < 5;
      }
      return true;
    });
  }

  const filteredUsers = filterProducts(users);

  return (
      <div className="d-flex">
        <div className="flex-shrink-0">
          <Navigation />
        </div>
        <div className="container-fluid" style={{ marginLeft: "250px", marginTop: "20px" }}>
          <h1 className="text-center mb-4">Inventory Management System</h1>
          <div className="row">
            <div className="col-lg-8">
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
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <button className="btn btn-success" type="button" onClick={addToInventory}>
                          {editIndex === -1 ? "Add" : "Update"}
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
                  <table className="table table-bordered mb-4">
                    <thead>
                    <tr>
                      <th colSpan="2">Search and Filter</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                      </td>
                      <td>
                        <select className="form-control" value={filter} onChange={handleFilterChange}>
                          <option value="all">All</option>
                          <option value="lowStock">Low Stock</option>
                        </select>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <table className="table table-bordered">
                    <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((row, index) => (
                        <tr key={index}>
                          <td>{row.name}</td>
                          <td>{row.price}</td>
                          <td>{row.qty}</td>
                          <td>{row.sum}</td>
                          <td>
                            <button className="btn btn-primary mr-2" onClick={() => editProduct(index)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => deleteProduct(index)}>Delete</button>
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
      </div>
  );
}

export default Inventory;
