import React, { useEffect, useState } from "react";
import plus from "../assest/plus.svg";
import Navigation from "../Components/Navigation";
import "../styles/expense.css";
import edit from "../assest/edit.svg";
import delete_icon from "../assest/delete.svg";
import { localhost_backend } from '../env';
import {expenses_options} from "../assest/expenses_options";
import check from "../assest/check.svg"

function Expense() {
  let [expenses,setExpenses] = useState([])
  useEffect(()=>{
    fetch(localhost_backend+'expenses/expense',{headers: {
      'Authorization': 'Bearer '+localStorage.getItem("authToken")
   }})
    .then(response => {
      if(response.status == 200){
        return response.json()
      }
    })
    .then(response => {
      setExpenses(response)
    })
  },[])
  useEffect(()=>{
      let table_row = document.getElementById("template")
      let table_body = document.getElementById("table_body")
      let response_rows = document.getElementsByClassName("res")
      while(response_rows.length > 0) {
        response_rows[0].parentNode.removeChild(response_rows[0]);
    }
      for(let i = 0; i<expenses.length;i++){
        let clone_node = table_row.cloneNode(true)
      clone_node.id = ""
      clone_node.classList.add("res")
      clone_node.classList.remove("d-none")
      clone_node.id = expenses[i]["id"]
      clone_node.childNodes[0].innerHTML = expenses[i]["description"];
      clone_node.childNodes[1].innerHTML = expenses_options[expenses[i]["category"]-1];
      clone_node.childNodes[2].innerHTML = expenses[i]["created_at"];
      clone_node.childNodes[3].innerHTML = '$ '+expenses[i]["amount"];
      clone_node.childNodes[4].childNodes[0].name = expenses[i]["id"]
      clone_node.childNodes[4].childNodes[1].name = expenses[i]["id"]
      clone_node.childNodes[4].childNodes[1].addEventListener("click",() => deleteExpense(expenses[i]["id"]))
      table_body.appendChild(clone_node)
      }
  },[expenses])

  const deleteExpense = (id) => {
    let data = JSON.stringify({
      "id":id
    })
    fetch(localhost_backend+'expenses/expense',{method:"DELETE",headers: {
      'Authorization': 'Bearer '+localStorage.getItem("authToken")
    },body:data})
    .then(response => {
      if(response.status == 200){
        return response.json()
      }
    })
    .then(response => {
      setExpenses(response)
    })
  }
  return (
    <>
    <div className="d-flex">
      <div className="navigation">
        <Navigation />
      </div>
      <div style={{ maxHeight: "100vh", width: "80vw",paddingLeft:"5%" }}>
        <div style={{ marginTop: "3%" }}>
          <div className="d-flex justify-content-end">
            <div style={{ marginRight: "30px" }}>
              <button type="button" className="add-expense">
                <img src={plus} style={{ height: "30px" }} /> Add Expense
              </button>
            </div>
            <div style={{ alignSelf: "center" }}>
              <input
                type="search"
                style={{ fontSize: "25px" }}
                placeholder="Search by description"
              />
            </div>
          </div>
          <div>
            <table style={{width:"100%",marginTop:"4%", maxHeight:"70vw"}}>
              <thead>
                <tr style={{fontSize:"24px", border:"1px solid black", backgroundColor:"#ECE1E1"}}>
                  <th style={{width:"40%"}}>Expense</th>
                  <th>Category</th>
                  <th style={{width:"15%"}}>Date</th>
                  <th>Amount</th>
                  <th style={{width:"10%"}}>Actions</th>
                </tr>
              </thead>
              <tbody id="table_body">
                <tr style={{fontSize:"20px",marginTop:"5px"}} id="template" className="d-none">
                  <td className="description">
                    Expense
                  </td>
                  <td className="category">
                    Category
                  </td>
                  <td className="date">
                    2024-06-10
                  </td>
                  <td className="amount">
                    $ 200
                  </td>
                  <td>
                  <img src={edit} style={{marginRight:"5px"}} title="Edit" alt="edit" className="edit_icon"/>
                  <img  src={delete_icon} title="Delete" alt="delete" className="delete_icon"/>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <input type="text"/>
                  </td>
                  <td>
                    <select>
                      {
                        expenses_options.map(i => (<option>{i}</option>))
                      }
                    </select>
                  </td>
                  <td>
                    <input type="date"/>
                  </td>
                  <td>
                    <input type="number"/>
                  </td>
                  <td>
                    <img src={check}/>
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
