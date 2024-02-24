import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from './components/Header.jsx'; // Assuming you have a Header component
import HomePage from './components/HomePage.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import Welcome from './pages/Welcome.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import BookingDelivery from './components/BookingDelivery.jsx';
import EmployeeManagement from './components/EmployeeManagement.jsx'; // Add this line

const App = () => {
  return (
    <Router>
      <Header />
      <GoogleOAuthProvider clientId="263174241117-n1j7q8eqn323sr1s0p3i6t637589c8um.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path="/book-delivery" element={<BookingDelivery />} />
          <Route path="/employee-management" element={<EmployeeManagement />} /> {/* Add this line */}
          <Route path="/" element={<LoginSignup />} /> {/* Consider removing this line if it's unnecessary */}
          {/* Other routes */}
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default App;
