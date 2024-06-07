import React, { useEffect } from "react";
import plus from "../assest/plus.svg";
import Navigation from "../Components/Navigation";
import "../styles/expense.css";
import edit from "../assest/edit.svg";
import delete_icon from "../assest/delete.svg";
import { localhost_backend } from '../env';

function Expense() {
  
  return (
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
                  <th style={{width:"10%"}}>Actions</th>
                </tr>
              </thead>
              <tbody id="table_body">
                <tr style={{fontSize:"20px",marginTop:"5px"}} id="template">
                  <td>
                    Expense
                  </td>
                  <td>
                    Category
                  </td>
                  <td>
                    2024-06-10
                  </td>
                  <td>
                  <img src={edit} style={{marginRight:"5px"}} title="Edit" alt="edit"/>
                  <img src={delete_icon} title="Delete" alt="delete"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expense;
