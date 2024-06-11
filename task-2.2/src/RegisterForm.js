import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './App.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    if (!username) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordStrengthRegex.test(password)) {
      newErrors.password = 'Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, and a number';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = getPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const getPasswordStrength = (password) => {
    if (password.length < 4) {
      return 'Weak';
    } else if (password.length < 6) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Registration successful!');
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-400">
      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 rounded-lg shadow-2xl w-full max-w-md">
        <div>
          <h1 className='text-2xl text-gray-300 font-bold text-center mb-8'>RegisterForm</h1>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 placeholder: bg-slate-500 text-slate-900 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
          />
          {errors.username && <span className="text-red-500 text-xs italic">{errors.username}</span>}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 placeholder: bg-slate-500 text-slate-900 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-900"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && <span className="text-red-500 text-xs italic">{errors.password}</span>}
          {password && <span className="text-gray-300 text-xs italic pl-1">Password Strength: {passwordStrength}</span>}
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm Password:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 placeholder: bg-slate-500 text-slate-900 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Password"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-900"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.confirmPassword && <span className="text-red-500 text-xs italic">{errors.confirmPassword}</span>}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
