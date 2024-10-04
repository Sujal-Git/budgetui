import React, { createContext, useState } from 'react';

// Create the ExpenseContext
export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (title, amount) => {
    setExpenses(prevExpenses => [...prevExpenses, { title, amount }]);
  };

  const deleteExpense = (index) => {
    setExpenses(prevExpenses => prevExpenses.filter((_, i) => i !== index));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
