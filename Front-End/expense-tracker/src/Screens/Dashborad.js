import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { localhost_backend } from "../env";
import { fetchProducts } from "./api"; // Ensure fetchProducts is correctly implemented in your api.js
import { motion } from 'framer-motion';

// Register the necessary components
Chart.register(...registerables);

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchExpenses();
        fetchProductsFromApi();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch(localhost_backend + "expenses/expense", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setExpenses(data);
            } else {
                console.error('Error fetching expenses:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const fetchProductsFromApi = async () => {
        try {
            const products = await fetchProducts();
            setProducts(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const colorPalette = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)',
        'rgba(83, 102, 255, 0.6)',
        'rgba(255, 99, 71, 0.6)',
        'rgba(60, 179, 113, 0.6)'
    ];

    const getExpensesChartData = () => {
        if (!Array.isArray(expenses)) return { labels: [], datasets: [] };

        const labels = expenses.map(expense => expense.description);
        const data = expenses.map(expense => expense.amount);
        const backgroundColors = expenses.map((_, index) => colorPalette[index % colorPalette.length]);

        return {
            labels,
            datasets: [
                {
                    label: 'Expenses',
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundColors.map(color => color.replace('0.6', '0.8')),
                    hoverBorderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                    data,
                },
            ],
        };
    };

    const getInventoryChartData = () => {
        if (!Array.isArray(products)) return { labels: [], datasets: [] };

        const labels = products.map(product => product.name);
        const data = products.map(product => product.qty);

        const backgroundColors = products.map((product, index) => {
            if (product.qty < 10) {
                return 'rgba(255, 99, 132, 0.6)';
            }
            return colorPalette[index % colorPalette.length];
        });

        const borderColors = backgroundColors.map(color => color.replace('0.6', '1'));
        const hoverBackgroundColors = backgroundColors.map(color => color.replace('0.6', '0.8'));
        const hoverBorderColors = backgroundColors.map(color => color.replace('0.6', '1'));

        return {
            labels,
            datasets: [
                {
                    label: 'Inventory Quantity',
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                    hoverBackgroundColor: hoverBackgroundColors,
                    hoverBorderColor: hoverBorderColors,
                    data,
                },
            ],
        };
    };

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Navigation />
            </div>
            <div style={{ padding: '20px', width: '100%', marginLeft: '250px', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <b>Welcome to XpenseTrack!</b>
                </motion.h1>
                <div className="row justify-content-center">
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
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ marginTop: '20px' }}
                >
                   "XpenseTrack will make managing your Expenses and Inventory Easy!"
                    <div> <i>Your all-in-one solution for seamless expense and inventory management. With our user-friendly dashboard, effortlessly track your expenses and inventory in one place. Say goodbye to the hassle of juggling multiple systems – now you can streamline your operations with ease. </i></div>
                </motion.h3>
            </div>
        </div>
    );
}

export default Dashboard;
