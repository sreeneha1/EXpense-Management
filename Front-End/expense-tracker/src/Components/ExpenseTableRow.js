import React from "react";
import { expenses_options } from "../assest/expenses_options";
import edit from "../assest/edit.svg";
import delete_icon from "../assest/delete.svg";
import { useState } from "react";
import check from "../assest/check.svg";
import moment from "moment";


export default function ExpenseTableRow({
  id,
  des,
  category,
  date,
  amount,
  editExpense,
  deleteExpense,
}) {
  let [isEdit, setIsEdit] = useState(false);
  let [editExpenseState,setEditExpenseState] = useState({
    id:id,
    description: des,
    category: category,
    amount: amount,
    date: moment(date).format('YYYY-MM-DD')
  })

  const handelIsEdit = () => {
    console.log("hitted");
    setIsEdit(true);
  };

  const handelEdit = () => {
    setIsEdit(false)
    editExpense(editExpenseState)
  }
  return (
    <tr style={{ fontSize: "20px", marginTop: "5px" }} id={id}>
      <td className="description">
        {isEdit ? <input type="text" value={editExpenseState.description} onChange={(event)=> setEditExpenseState({...editExpenseState,description:event.target.value})}/> : editExpenseState.description}
      </td>
      <td className="category">
        {isEdit ? (
          <select
            style={{ height: "35px", fontSize: "20px" }}
            onChange={(event) =>
              setEditExpenseState({
                ...editExpenseState,
                category: event.target.value,
              })
            }
          >
            {expenses_options.map((val, ind) => (
              <option
                value={ind + 1}
                key={ind + 1}
                selected={editExpenseState.category == ind + 1}
              >
                {val}
              </option>
            ))}
          </select>
        ) : (
          expenses_options[editExpenseState.category-1]
        )}
      </td>
      <td className="date">
        {isEdit ? <input type="date" value={editExpenseState.date} onChange={(event)=> setEditExpenseState({...editExpenseState,date:event.target.value})}/> : editExpenseState.date}
      </td>
      <td className="amount">
        {isEdit ? <input type="number" value={editExpenseState.amount} onChange={(event)=> setEditExpenseState({...editExpenseState,amount:event.target.value})}/> : "$ " + editExpenseState.amount}
      </td>
      <td>
        {isEdit ? (
          <img
            src={check}
            style={{ width: "25px", height: "25px" }}
            onClick={handelEdit}
          />
        ) : (
          <>
            <img
              src={edit}
              style={{ marginRight: "5px" }}
              title="Edit"
              alt="edit"
              className="edit_icon"
              onClick={handelIsEdit}
            />
            <img
              src={delete_icon}
              title="Delete"
              alt="delete"
              className="delete_icon"
              onClick={() => deleteExpense(id)}
            />
          </>
        )}
      </td>
    </tr>
  );
}
