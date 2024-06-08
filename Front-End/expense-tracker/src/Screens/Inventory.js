import React, { useState, useEffect } from "react";
import Navigation from "../Components/Navigation"; // Ensure the correct path to Navigation component

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [lowStockAlert, setLowStockAlert] = useState("");

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
    setUsers([...users, newProduct]);
    setName("");
    setQty(0);
    setPrice(0);
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

  return (
      <div style={{ display: "flex" }}>
        <div className="navigation">
          <Navigation />
        </div>
        <div className="container-fluid bg-2 text-center" style={{ marginLeft: "250px" }}> {/* Ensure this margin matches the width of the fixed navigation */}
          <h1>Inventory Management System React</h1>
          <br />
          <div className="row">
            <div className="col-sm-8">
              <table className="table table-bordered">
                <h3>Add Products</h3>
                <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Option</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Price"
                        value={price}
                        onChange={handlePriceChange}
                    />
                  </td>
                  <td>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Qty"
                        value={qty}
                        onChange={handleQuantityChange}
                    />
                  </td>
                  <td>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Total"
                        disabled
                        value={total}
                    />
                  </td>
                  <td>
                    <button className="btn btn-success" type="button" onClick={addToInventory}>
                      Add
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
              {lowStockAlert && (
                  <div className="alert alert-warning">
                    {lowStockAlert}
                  </div>
              )}
              <h3>Products</h3>
              <table className="table table-bordered">
                <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {users.map((row, index) => (
                    <tr key={index}>
                      <td>{row.name}</td>
                      <td>{row.price}</td>
                      <td>{row.qty}</td>
                      <td>{row.sum}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className="col-sm-4">
              <div className="form-group" align="left">
                <h3>Total</h3>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Total"
                    required
                    disabled
                    value={users.reduce((total, user) => total + user.sum, 0)}
                />
                <br />
                <button type="button" className="btn btn-success" onClick={refreshPage}>
                  <span>Clear Inventory</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Inventory;
