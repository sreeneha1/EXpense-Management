import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { localhost_backend } from "../env";
import { fetchProducts } from "./api"; // Make sure this is correctly implemented in your api.js

// Register the necessary components
Chart.register(...registerables);

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchExpenses();
        fetchProductsFromApi();
    }, []);

    const fetchExpenses = () => {
        fetch(localhost_backend + "expenses/expense", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                setExpenses(data);
            })
            .catch((error) => console.error('Error fetching expenses:', error));
    };

    const fetchProductsFromApi = async () => {
        try {
            const products = await fetchProducts();
            setProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const getExpensesChartData = () => {
        const labels = expenses.map(expense => expense.description);
        const data = expenses.map(expense => expense.amount);

        return {
            labels,
            datasets: [
                {
                    label: 'Expenses',
                    backgroundColor: 'rgba(75,192,192,0.6)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.8)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data,
                },
            ],
        };
    };

    const getInventoryChartData = () => {
        const labels = products.map(product => product.name);
        const data = products.map(product => product.qty);

        return {
            labels,
            datasets: [
                {
                    label: 'Inventory Quantity',
                    backgroundColor: 'rgba(153,102,255,0.6)',
                    borderColor: 'rgba(153,102,255,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(153,102,255,0.8)',
                    hoverBorderColor: 'rgba(153,102,255,1)',
                    data,
                },
            ],
        };
    };

    return (
        <div className="d-flex">
            <div className="navigation">
                <Navigation />
            </div>
            <div style={{ padding: '20px', width: '100%' }}>
                <h1>Dashboard</h1>
                <div className="row">
                    <div className="col-lg-6">
                        <div style={{ width: '100%', margin: 'auto' }}>
                            <Bar
                                data={getExpensesChartData()}
                                options={{
                                    maintainAspectRatio: true,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div style={{ width: '100%', margin: 'auto' }}>
                            <Bar
                                data={getInventoryChartData()}
                                options={{
                                    maintainAspectRatio: true,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;