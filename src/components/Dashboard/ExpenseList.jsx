import React, { useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  return (
    <div>
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.title}: ${expense.amount}
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
