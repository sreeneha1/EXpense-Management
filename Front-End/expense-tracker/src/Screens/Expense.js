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
  let [newExpense, setNewExpense] = useState({
    description: "",
    category: "",
    amount: 0,
    date: moment().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    fetch(localhost_backend + "expenses/expense", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((response) => {
        setExpenses(response);
      });
  }, []);
  // useEffect(()=>{
  //     let table_row = document.getElementById("template")
  //     let table_body = document.getElementById("table_body")
  //     let response_rows = document.getElementsByClassName("res")
  //     while(response_rows.length > 0) {
  //       response_rows[0].parentNode.removeChild(response_rows[0]);
  //   }
  //   console.log(expenses)
  //     for(let i = 0; i<expenses.length;i++){
  //       let clone_node = table_row.cloneNode(true)
  //     clone_node.id = ""
  //     clone_node.classList.add("res")
  //     clone_node.classList.remove("d-none")
  //     clone_node.id = expenses[i]["id"]
  //     clone_node.childNodes[0].innerHTML = expenses[i]["description"];
  //     clone_node.childNodes[1].innerHTML = expenses_options[expenses[i]["category"]-1];
  //     clone_node.childNodes[2].innerHTML = expenses[i]["created_at"];
  //     clone_node.childNodes[3].innerHTML = '$ '+expenses[i]["amount"];
  //     clone_node.childNodes[4].childNodes[0].name = expenses[i]["id"]
  //     clone_node.childNodes[4].childNodes[1].name = expenses[i]["id"]
  //     clone_node.childNodes[4].childNodes[1].addEventListener("click",() => deleteExpense(expenses[i]["id"]))
  //     clone_node.childNodes[4].childNodes[0].addEventListener("click",() => editExpense(expenses[i]["id"]))
  //     table_body.appendChild(clone_node)
  //     }
  // },[expenses])

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
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((response) => {
        setExpenses(response);
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
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((response) => {
        setExpenses([...expenses, response]);
        setNewExpense({
          description: "",
          category: "",
          amount: 0,
          date: moment().format("YYYY-MM-DD"),
        });
      });
  };

  const editExpense = (expenseState) => {
    console.log(expenseState)
    expenses.map((i)=>{
      if(i.id == expenseState.id){
        i.description = expenseState.description
        i.category = expenseState.category
        i.amount= expenseState.amount
        i.date = expenseState.date
      }
      return i
    })
    fetch(localhost_backend + "expenses/expense", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
      body: JSON.stringify(expenseState),
    })
  };
  
  return (
    <>
      <div className="d-flex">
        <div className="navigation">
          <Navigation />
        </div>
        <div style={{ maxHeight: "100vh", width: "80vw", paddingLeft: "5%" }}>
          <div style={{ marginTop: "3%" }}>
            <div className="d-flex justify-content-end">
              <div style={{ alignSelf: "center" }}>
                <input
                  type="search"
                  style={{ fontSize: "25px" }}
                  placeholder="Search by description"
                />
              </div>
            </div>
            <div>
              <table
                style={{ width: "100%", marginTop: "4%", maxHeight: "70vw" }}
              >
                <thead>
                  <tr
                    style={{
                      fontSize: "24px",
                      border: "1px solid black",
                      backgroundColor: "#ECE1E1",
                    }}
                  >
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
                        style={{ height: "35px", width: "65%" }}
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
                        style={{ height: "35px", fontSize: "20px" }}
                        onChange={(event) =>
                          setNewExpense({
                            ...newExpense,
                            category: event.target.value,
                          })
                        }
                      >
                        {expenses_options.map((val, ind) => (
                          <option
                            value={ind + 1}
                            key={ind + 1}
                            selected={newExpense.category == ind + 1}
                          >
                            {val}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="date"
                        pattern="\d{4}-\d{2}-\d{2}"
                        style={{ height: "35px", fontSize: "20px" }}
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
                        style={{ fontSize: "20px" }}
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
                        style={{ width: "25px", height: "25px" }}
                        onClick={addExpense}
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
