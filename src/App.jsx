import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {UserProvider} from './context/UserContext';
import ExpenseProvider from './context/ExpenseContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <UserProvider>
      <ExpenseProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
      </ExpenseProvider>
    </UserProvider>
  );
}

export default App;
