import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (!token) {
      setMessage('Token is invalid or has expired.');
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Your password has been successfully reset.');
        navigate('/login'); 
      } else {
        setMessage(data.message || 'An error occurred, please try again.');
      }
    } catch (error) {
      setMessage('An error occurred, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="container max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-purple-700 mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <input
              type="password"
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
            >
              Reset Password
            </button>
          </div>
        </form>
        {message && <div className="mt-4 text-center text-sm text-purple-500">{message}</div>}
      </div>
    </div>
  );
};

export default ResetPassword;
