import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <ToastContainer />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;
