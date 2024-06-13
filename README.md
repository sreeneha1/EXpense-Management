# Expense-Inventory-Management 
A comprehensive application designed to manage both personal expenses and inventory. This application helps users track their spending, manage inventory items, categorize entries, and generate insightful reports.
#Table of Contents
   #Overview
   #Features
   #Technologies Used
   #Getting Started
   #Installation
   #Usage

#Overview
The Expense-Inventory-Management application provides a seamless way to manage your finances and inventory. It allows users to record expenses, manage inventory items, categorize entries, and generate reports to analyze their financial and inventory data.

Features :
1) Add and edit expenses
2) Add and edit inventory items
3) Categorize expenses and inventory
4) View summary and detailed reports
5) User authentication and authorization

#Technologies Used
Frontend: React 
Backend: Django
Database: Sqlite3
Authentication: JWT (via django-rest-framework-simplejwt)
Styling: Bootstrap

#Getting Started
To get a local copy up and running, follow these steps.

#Prerequisites
Node.js and npm installed on your local machine.

#Installation
git clone https://github.com/sreeneha1/Expense-Management.git
cd Expense-Management

#Backend-Setup 
1) Change Directory
   cd Back-End/expense
2) Creating the virtual environment
   python -m venv venv
3)Activating the virtual environment
  Linux-mac (source venv/bin/activate) Windows ( venv\Scripts\activate)
4)Installing dependencies
   pip install -r requirements.txt
6)Making migrations to database
   python manage.py makemigrations
   python manage.py migrate
7)running the server
   python manage.py runserver   (if ask for username go for creating superuser steps as follow)
# python manage.py createsuperuser (add your username password and jump into server)

#Front-End Setup 
1) Change Directory
   cd Front-End/expense-tracker
2) Run the application :
    npm start
#Usage
1) Register: Create a new account.
2) Login: Access your account.
3) Add Expense: Record a new expense by providing the amount, category, and date.
4) Add Inventory Item: Record a new inventory item by providing the name, category, quantity, and price.
5) View Expenses: View a list of all your expenses.
6) View Inventory: View a list of all your inventory items.
7) Generate Reports: View reports to analyze your spending and inventory data.
