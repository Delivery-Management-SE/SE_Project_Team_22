import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from './components/Header.jsx'; 
import HomePage from './components/HomePage.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import Welcome from './pages/Welcome.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import BookingDelivery from './components/BookingDelivery.jsx';
import EmployeeManagement from './components/EmployeeManagement.jsx'; 
import TrackingDelivery from './components/trackingDelivery.jsx';
import CustomerView from './components/CustomerView.jsx';

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
          <Route path="/tracking" element={<TrackingDelivery />} />
          <Route path="/customer-view" element={<CustomerView />} />
          <Route path="/" element={<LoginSignup />} /> {/* Consider removing this line if it's unnecessary */}
          {/* Other routes */}
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default App;
