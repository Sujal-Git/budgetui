import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
