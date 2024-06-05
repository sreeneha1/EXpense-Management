import React, { useState } from "react";

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(""); // Ensured name starts as an empty string

  function calculateTotal() {
    const newTotal = price * qty;
    setSum(newTotal);
  }

  function handlePriceChange(e) {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      calculateTotal(); // Recalculate total on price change
    }
  }

  function handleQuantityChange(e) {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
      calculateTotal(); // Recalculate total on quantity change
    }
  }

  function addToInventory() {
    const newProduct = { name, price, qty, sum: price * qty };
    setUsers([...users, newProduct]); // Added spread operator for immutable update
    setName(""); // Clear name input after adding
    setQty(0); // Clear qty input after adding
    setPrice(0); // Clear price input after adding
  }

  function refreshPage() {
    window.location.reload(); // Reload the entire page (not ideal)
  }

  return (
    <div className="container-fluid bg-2 text-center">
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
                    placeholder="Enter Total"
                    id="total_cost"
                    name="total_cost"
                    disabled
                    value={sum}
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
              value={users.reduce((total, user) => total + user.sum, 0)} // Calculate total from users array
            />
            <br />
            <button type="button" className="btn btn-success" onClick={refreshPage}>
              <span>Clear Inventory</span>
            </button>  {/* Improved button text */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Inventory