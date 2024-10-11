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
  const [investmentTip, setInvestmentTip] = useState('');
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

  // Investment tips based on expense brackets
  const investmentTips = [
    { limit: 500, tip: 'Consider investing in low-cost index funds.' },
    { limit: 1000, tip: 'Diversify your portfolio with stocks and bonds.' },
    { limit: 1500, tip: 'Explore high-yield savings accounts or CDs.' },
    { limit: 2000, tip: 'You might want to explore real estate or mutual funds.' },
    { limit: 3000, tip: 'Consider investing in dividend-paying stocks.' },
    { limit: 4000, tip: 'Look into corporate bonds or government bonds.' },
    { limit: 5000, tip: 'Explore opportunities in high-growth sectors like tech.' },
    { limit: 6000, tip: 'Start considering international equity funds.' },
    { limit: 7000, tip: 'Look at diversified commodities investments.' },
    { limit: 8000, tip: 'Explore real estate investment trusts (REITs).' },
    { limit: 9000, tip: 'Consider investing in small-cap stocks.' },
    { limit: 10000, tip: 'Investigate municipal bonds for tax-free income.' },
    { limit: 12000, tip: 'Look into socially responsible investment funds.' },
    { limit: 14000, tip: 'Explore hedge funds or private equity if eligible.' },
    { limit: 16000, tip: 'Diversify further with precious metals like gold.' },
    { limit: 18000, tip: 'Consider building a portfolio of blue-chip stocks.' },
    { limit: 20000, tip: 'Research peer-to-peer lending platforms.' },
    { limit: 25000, tip: 'Explore angel investing in startups.' },
    { limit: 30000, tip: 'Consider diversifying with ETFs in different sectors.' },
    { limit: 35000, tip: 'Look into forex trading for currency diversification.' },
    { limit: 40000, tip: 'Invest in real estate properties for rental income.' },
    { limit: 45000, tip: 'Research private real estate partnerships.' },
    { limit: 50000, tip: 'Explore venture capital opportunities.' },
    { limit: 60000, tip: 'Consider art or collectible investments.' },
    { limit: 70000, tip: 'Look into franchise ownership opportunities.' },
    { limit: 80000, tip: 'Invest in farmland or agricultural projects.' },
    { limit: 90000, tip: 'Diversify further with infrastructure funds.' },
    { limit: 100000, tip: 'Consider offshore investments for tax benefits.' },
    { limit: 120000, tip: 'Explore investing in rare gemstones or luxury goods.' },
    { limit: 140000, tip: 'Look into hedge funds specializing in tech sectors.' },
    { limit: 160000, tip: 'Consider private credit investment opportunities.' },
    { limit: 180000, tip: 'Research investment opportunities in green energy.' },
    { limit: 200000, tip: 'Explore investing in renewable energy projects.' },
    { limit: 250000, tip: 'Consider setting up a family office for wealth management.' },
    { limit: 300000, tip: 'Look into high-yield, tax-advantaged bonds.' },
    { limit: 350000, tip: 'Explore venture capital funds focusing on innovation.' },
    { limit: 400000, tip: 'Invest in a diversified mix of global ETFs.' },
    { limit: 450000, tip: 'Research direct investments in renewable energy projects.' },
    { limit: 500000, tip: 'Consider alternative assets like hedge funds or private equity.' },
    { limit: 600000, tip: 'Explore investments in clean water and sustainable agriculture.' },
    { limit: 700000, tip: 'Consider co-investing with institutional investors.' },
    { limit: 800000, tip: 'Look into equity crowdfunding for innovative startups.' },
    { limit: 900000, tip: 'Research tax-efficient wealth transfer strategies.' },
    { limit: 1000000, tip: 'Focus on long-term capital preservation strategies.' },
  ];
  

  useEffect(() => {
    if (totalExpenses > budgetLimit && !alertShown) {
      makeToast();
      setAlertShown(true);
    }

    // Show investment tips based on expense amount
    const tip = investmentTips.find(t => totalExpenses <= t.limit);
    setInvestmentTip(tip ? tip.tip : 'Keep saving and stay informed about investments.');

  }, [totalExpenses, budgetLimit, alertShown]);

  return (
    <div className="dashboard">
     <h1 onDoubleClick={()=>{navigate('/')}}>Welcome Back, {loggedInUser?.username || 'Guest'}</h1>

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
        <p className="investment-tip">Investment Tip: {investmentTip}</p>
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
