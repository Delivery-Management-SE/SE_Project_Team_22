import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToBooking = () => {
    navigate('/book-delivery'); // Make sure the path matches your booking page's route
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center">
      <h1 className="text-5xl text-blue-900 font-bold mb-4">
        Welcome to QuickDelivery
      </h1>
      <p className="text-lg text-blue-700 mb-8 px-4 text-center">
        Your one-stop solution for fast and reliable delivery. Get started by booking your delivery with us.
      </p>
      <button
        onClick={navigateToBooking}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Book a Delivery
      </button>
    </div>
  );
};

export default HomePage;
