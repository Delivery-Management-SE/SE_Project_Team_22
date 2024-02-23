import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null); // Reset the message

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('A password reset link has been sent to your email address.');
        navigate('/reset-password');
      } else {
        setMessage(data.message || 'An error occurred, please try again.');
        navigate('/reset-password');
      }
    } catch (error) {
      setMessage('An error occurred, please try again.');
      navigate('/reset-password');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="container w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-purple-700 mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <input
              type="email"
              id="email"
              className="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        {message && <div className="mt-4 text-center text-sm text-purple-500">{message}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
