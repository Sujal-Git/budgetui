import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { ExpenseContext } from '../../context/ExpenseContext'; // Import ExpenseContext
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const { deleteExpense } = useContext(ExpenseContext); // Get deleteExpense from context
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleAddExpense = () => {
    if (expense && amount) {
      addExpense(expense, amount); // Ensure this function is correctly defined
      setExpense('');
      setAmount('');
    }
  };

  const handleDeleteExpense = (index) => {
    deleteExpense(index); // Call deleteExpense from context

    // Update localStorage as needed
    const updatedExpenses = loggedInUser.expenses.filter((_, i) => i !== index);
    const updatedUser = { ...loggedInUser, expenses: updatedExpenses };
    const updatedUsers = JSON.parse(localStorage.getItem('users')).map(user =>
      user.username === loggedInUser.username ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  // The rest of your component...
};

export default Dashboard;
