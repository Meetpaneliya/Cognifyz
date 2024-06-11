import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <Link to="/" className="text-blue-500 underline">Go to Register</Link>
    </div>
  );
};

export default Home;
