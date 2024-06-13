import React, { useEffect, useState } from "react";
import plus from "../assest/plus.svg";
import Navigation from "../Components/Navigation";
import "../styles/expense.css";
import { localhost_backend } from "../env";
import { expenses_options } from "../assest/expenses_options";
import check from "../assest/check.svg";
import moment from "moment";
import ExpenseTableRow from "../Components/ExpenseTableRow";

function Expense() {
  let [expenses, setExpenses] = useState([]);
  let [unfilteredExpenses, setUnfilteredExpenses] = useState([]);
  let [newExpense, setNewExpense] = useState({
    description: "",
    category: 1,
    amount: 0,
    date: moment().format("YYYY-MM-DD"),
  });
  let [searchText, setSearchText] = useState("");

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
      .then((response) => {
        setUnfilteredExpenses(response);
      });
  }, []);

  useEffect(() => {
    setExpenses(
      unfilteredExpenses.filter((i) => i.description.includes(searchText))
    );
  }, [unfilteredExpenses, searchText]);

  const deleteExpense = (id) => {
    let data = JSON.stringify({
      id: id,
    });
    fetch(localhost_backend + "expenses/expense", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      body: data,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setUnfilteredExpenses(response);
      });
  };

  const addExpense = () => {
    fetch(localhost_backend + "expenses/expense", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify(newExpense),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setUnfilteredExpenses([...expenses, response]);
        setNewExpense({
          description: "",
          category: "",
          amount: 0,
          date: moment().format("YYYY-MM-DD"),
        });
      });
  };

  const editExpense = (expenseState) => {
    console.log(expenseState);
    unfilteredExpenses.map((i) => {
      if (i.id === expenseState.id) {
        i.description = expenseState.description;
        i.category = expenseState.category;
        i.amount = expenseState.amount;
        i.date = expenseState.date;
      }
      return i;
    });
    fetch(localhost_backend + "expenses/expense", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify(expenseState),
    });
  };

  return (
    <>
      <div className="d-flex">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="main-content">
          <div className="animated-inventory">
            <h1><b>EXPENSES</b></h1>
            <div className="d-flex justify-content-end">
              <div>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search by description"
                  onChange={(event) => setSearchText(event.target.value)}
                  value={searchText}
                />
              </div>
            </div>
            <div>
              <table className="expense-table">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Expense</th>
                    <th>Category</th>
                    <th style={{ width: "15%" }}>Date</th>
                    <th>Amount</th>
                    <th style={{ width: "10%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody id="table_body">
                  {expenses.map((i) => (
                    <ExpenseTableRow
                      key={i["id"]}
                      id={i["id"]}
                      des={i["description"]}
                      category={i["category"]}
                      date={i["created_at"]}
                      amount={i["amount"]}
                      deleteExpense={deleteExpense}
                      editExpense={editExpense}
                    />
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <input
                        type="text"
                        onChange={(event) =>
                          setNewExpense({
                            ...newExpense,
                            description: event.target.value,
                          })
                        }
                        value={newExpense.description}
                      />
                    </td>
                    <td>
                      <select
                        onChange={(event) =>
                          setNewExpense({
                            ...newExpense,
                            category: event.target.value,
                          })
                        }
                        value={newExpense.category}
                      >
                        {expenses_options.map((val, ind) => (
                          <option value={ind + 1} key={ind + 1}>
                            {val}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={(event) =>
                          setNewExpense({
                            ...newExpense,
                            date: event.target.value,
                          })
                        }
                        value={newExpense.date}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(event) =>
                          setNewExpense({
                            ...newExpense,
                            amount: event.target.value,
                          })
                        }
                        value={newExpense.amount}
                      />
                    </td>
                    <td>
                      <img
                        src={check}
                        className="add-expense"
                        onClick={addExpense}
                        alt="Add Expense"
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
