import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';



import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('User'); 
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();
  const [signedUpUsername, setSignedUpUsername] = useState('');

  const handleSignUp = async () => {
    
    if (userType === 'Admin' && passcode !== 'adminPasscode') {
      alert('Invalid passcode for Admin signup');
      return;
    }

    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        userType
      })
    });

    if (response.ok) {
      setSignedUpUsername(username);
      navigate('/welcome', { state: { username } });
    } else {
      console.error('Signup failed');
    }
  };

  const handleLogin = () => {
    
    if (userType === 'Admin' && passcode !== 'adminPasscode') {
      alert('Invalid passcode for Admin login');
      return;
    }

    // Logic for handling login
    console.log('Login');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="container w-96 p-12 bg-white rounded-lg shadow-md">
        <div className="header mb-6">
          <div className="text-3xl font-semibold text-center text-purple-700">{action}</div>
          <div className="underline h-1 bg-purple-700 mt-2"></div>
        </div>
        <div className="inputs space-y-4">
          {/* Radio buttons for user type selection */}
          <div className="flex items-center space-x-4 mb-4">
            <label className="inline-flex items-center">
              <input type="radio" name="userType" value="User" className="form-radio text-purple-600" checked={userType === 'User'} onChange={() => setUserType('User')} />
              <span className="ml-2">User</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="userType" value="Admin" className="form-radio text-purple-600" checked={userType === 'Admin'} onChange={() => setUserType('Admin')} />
              <span className="ml-2">Admin</span>
            </label>
          </div>

          {action === "Login" ? null : (
            <div className="input flex items-center space-x-2">
              <img src={user_icon} alt="" className="w-5 h-5"/>
              <input type="text" placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          )}

          <div className="input flex items-center space-x-2">
            <img src={email_icon} alt="" className="w-5 h-5"/>
            <input type="email" placeholder="Email Id" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input flex items-center space-x-2">
            <img src={password_icon} alt="" className="w-5 h-5"/>
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {/* Radio buttons for user type selection */}
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="userType" value="User" checked={userType === 'User'} onChange={() => setUserType('User')} />
              User
            </label>
            <label>
              <input type="radio" name="userType" value="Admin" checked={userType === 'Admin'} onChange={() => setUserType('Admin')} />
              Admin
            </label>
          </div>

          {/* Passcode input for Admin signup and login */}
          {userType === 'Admin' && (
            <div className="input flex items-center space-x-2">
              <img src={password_icon} alt="" />
              <input type="password" placeholder="Admin Passcode" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
            </div>
          )}

          {action === "Sign Up" ? (
            <div className="text-sm text-purple-500 mt-2">
              Already have an account? <span className="cursor-pointer" onClick={() => setAction("Login")}>Login</span>
            </div>
          ) : (
            <div className="forgot-password text-sm text-purple-500 mt-2">
              Forgot Password? <span className="cursor-pointer" onClick={() => navigate('/forgot-password')}>Click here</span>
            </div>
          )}

          {action === "Login" && (
            <div className="google-login mt-4">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          )}

          <div className="submit-container mt-4">
            {action === "Sign Up" ? (
              <button className="submit w-full py-2 text-center rounded-lg bg-purple-600 text-white" onClick={handleSignUp}>Sign Up</button>
            ) : (
              <button className="submit w-full py-2 text-center rounded-lg bg-purple-600 text-white" onClick={handleLogin}>Login</button>
            )}
          </div>

          {action === "Login" && (
            <div className="text-sm text-purple-500 mt-2">
              New user? <span className="cursor-pointer" onClick={() => setAction("Sign Up")}>Sign Up</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
