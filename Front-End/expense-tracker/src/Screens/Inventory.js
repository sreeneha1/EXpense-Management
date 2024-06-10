import React, { useState, useEffect } from "react";
import Navigation from "../Components/Navigation";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "./api";

function Inventory() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  useEffect(() => {
    setTotal(price * qty);
  }, [price, qty]);

  useEffect(() => {
    checkLowStock();
  }, [products]);

  const fetchProductsFromApi = async () => {
    try {
      const products = await fetchProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
    }
  };

  const addOrUpdateProduct = async () => {
    if (editingProduct) {
      updateProductInApi();
    } else {
      addProductToApi();
    }
  };

  const addProductToApi = async () => {
    const newProduct = { name, price, qty };
    try {
      const response = await addProduct(newProduct);
      setProducts([...products, response]);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProductInApi = async () => {
    try {
      const response = await updateProduct({ id: editingProduct.id, name, price, qty });
      const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? response : product
      );
      setProducts(updatedProducts);
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProductFromApi = async (id) => {
    try {
      await deleteProduct(id);
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice(0);
    setQty(0);
    setEditingProduct(null);
  };

  const checkLowStock = () => {
    const lowStockItems = products.filter((product) => product.qty < 5);
    if (lowStockItems.length > 0) {
      const itemNames = lowStockItems.map((item) => item.name).join(", ");
      setLowStockAlert(`Low stock alert: ${itemNames} has less than 5 units!`);
    } else {
      setLowStockAlert("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (filter === "all") {
        return matchesSearch;
      } else if (filter === "lowStock") {
        return matchesSearch && product.qty < 5;
      }
      return true;
    });
  };

  const startEditingProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setQty(product.qty);
    setEditingProduct(product);
  };

  const filteredProducts = filterProducts(products);

  return (
      <div style={{ display: "flex" }}>
        <div className="navigation">
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
                      <td>Total:</td>
                      <td>
                        <input type="text" className="form-control" disabled value={total} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <button className="btn btn-success" type="button" onClick={addOrUpdateProduct}>
                          {editingProduct ? "Update" : "Add"}
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {lowStockAlert && <div className="alert alert-warning">{lowStockAlert}</div>}
              <div className="card mb-4">
                <div className="card-header">Products</div>
                <div className="card-body">
                  <table className="table table-bordered">
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
                    {filteredProducts.map((row) => (
                        <tr key={row.id}>
                          <td>{row.name}</td>
                          <td>{row.price}</td>
                          <td>{row.qty}</td>
                          <td>{row.sum}</td>
                          <td>
                            <button className="btn btn-primary" onClick={() => startEditingProduct(row)}>
                              Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => deleteProductFromApi(row.id)}>
                              Delete
                            </button>
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
