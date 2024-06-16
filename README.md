# Expense-Inventory-Management

A comprehensive application designed to manage both personal expenses and inventory. This application helps users track their spending, manage inventory items, categorize entries, and generate insightful reports.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
 - [Prerequisites](#prerequisites)
 - [Installation](#installation)
- [Usage](#usage)

## Overview
The Expense-Inventory-Management application provides a seamless way to manage your finances and inventory. It allows users to record expenses, manage inventory items, categorize entries, and generate reports to analyze their financial and inventory data.

## Features
- Add and edit expenses
- Add and edit inventory items
- Categorize expenses and inventory
- View summary and detailed reports
- User authentication and authorization

## Technologies Used
**Frontend:** React

**Backend:** Django

**Database:** Sqlite3

**Authentication:** JWT (via django-rest-framework-simplejwt)

**Styling:** Bootstrap

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js and npm installed on your local machine.

### Installation

1. Clone the repository:
   git clone https://github.com/sreeneha1/Expense-Management.git
2. Change directory:
   cd Expense-Management
3. Backend Setup:
   cd Back-End/expense
   python -m venv venv
- Activating the virtual environment:
  - Linux/Mac: `source venv/bin/activate`
  - Windows: `venv\Scripts\activate`

4. Install dependencies:
   `pip install -r requirements.txt`
5. Make migrations to the database:
   `python manage.py makemigrations`
   `python manage.py migrate`
6. Run the server:
   `python manage.py runserver`
- If prompted to create a superuser, follow these steps:
  ```
  python manage.py createsuperuser
  ```
  (Add your username and password, then proceed to the server)

7. Frontend Setup:
    cd Front-End/expense-tracker
    `npm install`
    `npm install framer-motion`
    `npm start`
##Usage
- 1) Register: Create a new account.
- 2) Login: Access your account.
- 3) Add Expense: Record a new expense by providing the amount, category, and date.
- 4) Add Inventory Item: Record a new inventory item by providing the name, category, quantity, and price.
- 5) View Expenses: View a list of all your expenses.
- 6) View Inventory: View a list of all your inventory items.
- 7) Generate Reports: View reports to analyze your spending and inventory data.
