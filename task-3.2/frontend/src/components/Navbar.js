import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      toast.success("Logout successful.");
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed.");
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">Home</Link>
        <div>
          {!isAuthenticated ? (
            <>
              <Link to="/signup" className="text-white mr-4">Signup</Link>
              <Link to="/login" className="text-white">Login</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
