import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      toast.success("Logout successful.");
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Dashboard</h2>
        <button onClick={handleLogout} className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
