import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import {useNavigate} from 'react-router-dom'
import './Dashboard.css'; // Updated CSS for the dark theme

const Dashboard = () => {
  const { loggedInUser, addExpense, logoutUser } = useContext(UserContext);
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const url=useNavigate()

  const handleAddExpense = () => {
    if (expense && amount) {
      addExpense({ name: expense, amount: parseFloat(amount) });
      setExpense('');
      setAmount('');
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = loggedInUser.expenses.filter((_, i) => i !== index);
    // Update user context and localStorage
    const updatedUser = { ...loggedInUser, expenses: updatedExpenses };
    const updatedUsers = JSON.parse(localStorage.getItem('users')).map(user =>
      user.username === loggedInUser.username ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    window.location.reload(); // Reload to update the UI
  };

  const handleLogout = () => {
    logoutUser();
     url('/')
  };

  // Calculate report data
  const totalExpense = loggedInUser.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = loggedInUser.expenses.length ? (totalExpense / loggedInUser.expenses.length).toFixed(2) : 0;

  return (
    <div className="dashboard">
      <h2>Welcome, {loggedInUser?.username}</h2>
      <div className="expense-form">
        <input
          type="text"
          className="input"
          placeholder="Expense name"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <input
          type="number"
          className="input"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="button add-expense-btn" onClick={handleAddExpense}>+</button>
      </div>

      <h3>Your Expenses:</h3>
      <ul className="expense-list">
        {loggedInUser?.expenses.map((expense, index) => (
          <li key={index} className="expense-item">
            {expense.name}: ${expense.amount.toFixed(2)}
            <button className="delete-btn" onClick={() => handleDeleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="report">
        <h4>Total Expenses: ${totalExpense.toFixed(2)}</h4>
        <h4>Average Expense: ${averageExpense}</h4>
      </div>

      <button className="button sign-out-btn" onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
