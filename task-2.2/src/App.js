import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import Home from './Home';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/HomePage" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
