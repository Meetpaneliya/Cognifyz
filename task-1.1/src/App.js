import React, { useState } from 'react'
import './App.css';

const App = () => {

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleChange = (e) => {

    if (e.target.name === "firstname") {
      setfirstname(e.target.value)
    }

    if (e.target.name === "lastname") {
      setlastname(e.target.value)
    }

    if (e.target.name === "email") {
      setemail(e.target.value)
    }

    if (e.target.name === "password") {
      setpassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { firstname, lastname, email, password };
    
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response from server:', data);
      
      // Clear the form data
      setfirstname("");
      setlastname("");
      setemail("");
      setpassword("");
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Firstname:</label>
          <input
            type='text'
            name='firstname'
            value={firstname}
            required
            onChange={handleChange}
            placeholder='Enter the firstname..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Lastname:</label>
          <input
            type='text'
            name='lastname'
            value={lastname}
            required
            onChange={handleChange}
            placeholder='Enter the lastname..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
          <input
            type='email'
            name='email'
            value={email}
            required
            onChange={handleChange}
            placeholder='Enter the email..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            required
            onChange={handleChange}
            placeholder='Enter the password..'
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  )

}
export default App;