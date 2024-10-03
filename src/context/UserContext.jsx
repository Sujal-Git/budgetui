import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load users and logged-in user from localStorage when the app initializes
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    const storedLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedLoggedInUser) {
      setLoggedInUser(storedLoggedInUser);
    }
  }, []);

  const registerUser = (username, password) => {
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return false;
    }

    const newUser = { username, password, expenses: [] };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to localStorage

    return true;
  };

  const loginUser = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setLoggedInUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save logged-in user to localStorage
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser'); // Remove from localStorage
  };

  const addExpense = (expense) => {
    const updatedUser = {
      ...loggedInUser,
      expenses: [...loggedInUser.expenses, expense]
    };
    setLoggedInUser(updatedUser);

    // Update users array
    const updatedUsers = users.map(user => user.username === loggedInUser.username ? updatedUser : user);
    setUsers(updatedUsers);

    // Persist both users and logged-in user data in localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ users, loggedInUser, registerUser, loginUser, logoutUser, addExpense }}>
      {children}
    </UserContext.Provider>
  );
};
