# Expense-Inventory-Management

A comprehensive application designed to manage both personal expenses and inventory. This application helps users track their spending, manage inventory items, categorize entries, and generate insightful analytics.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
 - [Prerequisites](#prerequisites)
 - [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)
- [CircleCI/CD](#circleCI/cd)

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
   'python -m venv venv'
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
-  `npm install`
-   `npm install framer-motion`
-    `npm start`
   
## Usage

- **Register:** Create a new account.
- **Login:** Access your account.
- **Add Expense:** Record a new expense by providing the amount, category, and date.
- **Add Inventory Item:** Record a new inventory item by providing the name, category, quantity, and price.
- **View Expenses:** View a list of all your expenses.
- **View Inventory:** View a list of all your inventory items.
- **Generate Reports:** View reports to analyze your spending and inventory data.

## Docker
This guide provides instructions on how to deploy the Expense Management application using Docker. The application consists of two components: backend and frontend, each available as separate Docker images hosted on Docker Hub.

- Docker Hub Username: tanmayee17
- Repository URL: https://hub.docker.com/repository/docker/tanmayee17/expense-management/general

- Available Tags
- backend
- frontend
- To view all available tags, visit the Tags section of the repository.

## Steps to Pull and Run the Docker Images
1. Pull the Docker Images
- Open your command line interface and run the following commands to pull the Docker images from Docker Hub:
- docker pull tanmayee17/expense-management:backend
- docker pull tanmayee17/expense-management:frontend

2. Run the Docker Containers
- Once the images are pulled, run the following commands to start the containers:
- Run the Backend Container
- docker run -d -p 8000:8000 tanmayee17/expense-management:backend

- Run the Frontend Container
- docker run -d -p 3000:3000 tanmayee17/expense-management:frontend

3. Access the Application
Open Google Chrome in incognito mode and navigate to:
http://localhost:3000

## CircleCI/CD
1. CircleCI Configuration File: The main configuration file for CircleCI is named .circleci/config.yml and is located in the root directory of the project.

2. Executors:
- Backend Executor: Utilizes the Docker image tanmayee17/expense-management:backend to run Python-based steps.
- Frontend Executor: Utilizes the Docker image tanmayee17/expense-management:frontend to run Node.js-based steps.

3. Jobs:

- Backend Job:
- Checkout: Checks out the repository code.
- Check Python Version: Ensures the correct Python version is used.
- Setup Backend Environment: Creates a virtual environment and installs dependencies.
- Test Backend: Runs Django tests using python manage.py test.

- Frontend Job:
- Checkout: Checks out the repository code.
- Check Node.js Version: Ensures the correct Node.js version is used.
- Setup Frontend Environment: Installs frontend dependencies using npm install.
- Test Frontend: Runs frontend tests using npm test.

4. Workflow:

- Build and Test Workflow: 
- Defines a workflow that runs both the backend and frontend jobs in parallel.

## CircleCI Test Execution:
CircleCI executes the pipeline in the following sequence:
- 1.	Checkout Code: 
- Both backend and frontend jobs begin by checking out the latest code from the repository.

- 2.	Setup Environment:
- Backend:
- Sets up a Python virtual environment.
- Installs required dependencies from requirements.txt.
- Frontend:
- Installs Node.js dependencies using npm install.

- 3.	Run Tests:
- Backend: Executes Django tests using python manage.py test.
- Frontend: Executes tests using npm test.

## CircleCI Project ID:
- ba16f2a3-1919-4c88-bd6e-047f50e9aa3e




