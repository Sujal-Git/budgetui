import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { ExpenseContext } from '../../context/ExpenseContext'; 
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const { addExpense, deleteExpense, expenses } = useContext(ExpenseContext);
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetLimit, setBudgetLimit] = useState(1000); // Example budget limit
  const navigate = useNavigate();

  const handleAddExpense = () => {
    if (expense && amount) {
      addExpense(expense, parseFloat(amount));
      setExpense('');
      setAmount('');
    }
  };

  const handleDeleteExpense = (index) => {
    deleteExpense(index);
    const updatedExpenses = loggedInUser.expenses.filter((_, i) => i !== index);
    const updatedUser = { ...loggedInUser, expenses: updatedExpenses };
    const updatedUsers = JSON.parse(localStorage.getItem('users')).map(user =>
      user.username === loggedInUser.username ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  const averageExpense = expenses.length ? (totalExpenses / expenses.length).toFixed(2) : 0;

  // Budget alert if limit is reached
  if (totalExpenses > budgetLimit) {
    alert('Budget limit reached!');
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="expense-form">
        <input 
          type="text" 
          placeholder="Expense Title" 
          value={expense} 
          onChange={(e) => setExpense(e.target.value)} 
          className="input expense-input"
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="input amount-input"
        />
        <button onClick={handleAddExpense} className="button">Add Expense</button>
      </div>

      <ul className="expense-list">
        {expenses.map((exp, index) => (
          <li key={index} className="expense-item">
            <span>{exp.title}: ${exp.amount}</span>
            <button onClick={() => handleDeleteExpense(index)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>

      {/* Report Section */}
      <div className="report">
        <h3>Expense Report</h3>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Average Expense: ${averageExpense}</p>
        <p>Budget Limit: ${budgetLimit}</p>
      </div>
    </div>
  );
};

export default Dashboard;
