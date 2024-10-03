import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setExpenses(currentUser.expenses || []);
    }
  }, [currentUser]);

  const addExpense = (title, amount) => {
    const newExpense = { title, amount: parseFloat(amount) };
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const deleteExpense = (index) => {
    setExpenses(prevExpenses => prevExpenses.filter((_, i) => i !== index));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
