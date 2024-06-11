import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstname":
        setFirstname(e.target.value);
        break;
      case "lastname":
        setLastname(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errors = {};
    if (!firstname) errors.firstname = "Firstname is required";
    if (!lastname) errors.lastname = "Lastname is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password.length < 6) errors.password = "Password must be at least 8 characters";

    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Send request to server
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Firstname:</label>
          <input
            type='text'
            name='firstname'
            value={firstname}
            onChange={handleChange}
            placeholder='Enter the firstname..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstname && <p style={{ color: 'ed' }}>{errors.firstname}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Lastname:</label>
          <input
            type='text'
            name='lastname'
            value={lastname}
            onChange={handleChange}
            placeholder='Enter the lastname..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastname && <p style={{ color: 'ed' }}>{errors.lastname}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='Enter the email..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p style={{ color: 'ed' }}>{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            placeholder='Enter the password..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p style={{ color: 'ed' }}>{errors.password}</p>}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;