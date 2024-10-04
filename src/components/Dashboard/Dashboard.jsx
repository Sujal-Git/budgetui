import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { ExpenseContext } from '../../context/ExpenseContext'; 
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
  const { loggedInUser, logoutUser } = useContext(UserContext);
  const { addExpense, deleteExpense, expenses, setExpenses } = useContext(ExpenseContext); 
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetLimit, setBudgetLimit] = useState(1000);
  const [newBudget, setNewBudget] = useState('');
  const [alertShown, setAlertShown] = useState(false); 
  const navigate = useNavigate();

  // Load expenses from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = storedUsers.find(user => user.username === loggedInUser.username);
    if (currentUser) {
      setExpenses(currentUser.expenses || []);  // Load expenses into state
    }
  }, [loggedInUser, setExpenses]);

  const handleAddExpense = () => {
    if (expense && amount) {
      const newExpense = { title: expense, amount: parseFloat(amount) };
      const updatedExpenses = [...expenses, newExpense];

      // Update state and localStorage
      setExpenses(updatedExpenses);
      updateUserExpensesInLocalStorage(updatedExpenses);

      setExpense('');
      setAmount('');
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);

    // Update state and localStorage
    setExpenses(updatedExpenses);
    updateUserExpensesInLocalStorage(updatedExpenses);
  };

  const updateUserExpensesInLocalStorage = (updatedExpenses) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(user => 
      user.username === loggedInUser.username ? { ...user, expenses: updatedExpenses } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify({ ...loggedInUser, expenses: updatedExpenses }));
  };

  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  const averageExpense = expenses.length ? (totalExpenses / expenses.length).toFixed(2) : 0;

  const handleSetBudget = () => {
    if (newBudget) {
      setBudgetLimit(parseFloat(newBudget));
      setNewBudget('');
      setAlertShown(false);
    }
  };

  const makeToast = () => {
    toast('Budget Limit Reached', {
      icon: '❌',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  useEffect(() => {
    if (totalExpenses > budgetLimit && !alertShown) {
      makeToast();
      setAlertShown(true);
    }
  }, [totalExpenses, budgetLimit, alertShown]);

  return (
    <div className="dashboard">
      <h1 className='titlemine' onDoubleClick={()=>{navigate('/')}}>Welcome back, {loggedInUser.username}!</h1> {/* Greeting message */}
      <Toaster />

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

      <div className="report">
        <h3>Expense Report</h3>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Average Expense: ${averageExpense}</p>
        <p>Budget Limit: ${budgetLimit}</p>
      </div>

      <ul className="expense-list">
        {expenses.map((exp, index) => (
          <li key={index} className="expense-item">
            <span>{exp.title}: ${exp.amount}</span>
            <button onClick={() => handleDeleteExpense(index)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>

      <div className="budget-form">
        <input 
          type="number" 
          placeholder="Set Budget Limit" 
          value={newBudget} 
          onChange={(e) => setNewBudget(e.target.value)} 
          className="input budget-input"
        />
        <button onClick={handleSetBudget} className="button">Set Budget</button>
      </div>
    </div>
  );
};

export default Dashboard;
