import React, { useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import { calculateAverage } from '../../utils/calculateAverage';

const Report = () => {
  const { expenses } = useContext(ExpenseContext);

  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const averageAmount = calculateAverage(expenses);

  return (
    <div>
      <h3>Total Expenses: ${totalAmount}</h3>
      <h3>Average Expense: ${averageAmount}</h3>
    </div>
  );
};

export default Report;
