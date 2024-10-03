import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { ExpenseContext } from '../../context/ExpenseContext'; 
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const { addExpense, deleteExpense, expenses } = useContext(ExpenseContext); // Ensure both addExpense and deleteExpense are destructured
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleAddExpense = () => {
    if (expense && amount) {
      addExpense(expense, amount); 
      setExpense('');
      setAmount('');
    }
  };

  const handleDeleteExpense = (index) => {
    deleteExpense(index);

    // Update localStorage if necessary
    const updatedExpenses = loggedInUser.expenses.filter((_, i) => i !== index);
    const updatedUser = { ...loggedInUser, expenses: updatedExpenses };
    const updatedUsers = JSON.parse(localStorage.getItem('users')).map(user =>
      user.username === loggedInUser.username ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  return (
    <div>
      {/* Render your dashboard UI here */}
      <h1>Dashboard</h1>
      {/* Add expense form */}
      <input 
        type="text" 
        placeholder="Expense Title" 
        value={expense} 
        onChange={(e) => setExpense(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={handleAddExpense}>Add Expense</button>

      {/* Render the list of expenses */}
      <ul>
        {expenses.map((exp, index) => (
          <li key={index}>
            {exp.title}: ${exp.amount}
            <button onClick={() => handleDeleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
