import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { localhost_backend } from "../env";

// Register the necessary components
Chart.register(...registerables);

function Dashboard() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
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
            });
    }, []);

    const getChartData = () => {
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

    return (
        <>
            <div className="d-flex">
                <div className="navigation">
                    <Navigation />
                </div>
                <div style={{ padding: '20px', width: '100%' }}>
                    <h1>Dashboard</h1>
                    <div style={{ width: '80%', margin: 'auto' }}>
                        <Bar
                            data={getChartData()}
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
        </>
    );
}

export default Dashboard;