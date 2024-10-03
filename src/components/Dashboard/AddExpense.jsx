import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';

const AddExpense = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    addExpense(title, amount);
    setTitle('');
    setAmount('');
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleAddExpense}>Add</button>
    </div>
  );
};

export default AddExpense;
