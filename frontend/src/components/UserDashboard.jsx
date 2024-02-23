import React from 'react';
import DeliveryMap from './DeliveryMap'; // Make sure to import DeliveryMap

const UserDashboard = () => {
  // Placeholder data, you'd replace this with data fetched from your backend
  const activeDeliveries = [
    { id: 1, status: 'In Transit', eta: '3:00 PM', location: [-122.486052, 37.830348] }, // Add location data
    // ... more deliveries
  ];
  const deliveryHistory = [
    { id: 100, status: 'Delivered', date: '2024-02-18' },
    // ... more history items
  ];

  // Function to handle when the "Track on Map" button is clicked
  // Assuming you want to toggle the map display
  const handleTrackOnClick = (deliveryId) => {
    // Logic to handle map tracking
    // For example, you could toggle a state to show/hide the map
    console.log('Tracking delivery with ID:', deliveryId);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">User Dashboard</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Active Deliveries</h2>
          {activeDeliveries.map(delivery => (
            <div key={delivery.id} className="mb-4 p-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  Delivery #{delivery.id} - Status: {delivery.status} - ETA: {delivery.eta}
                </div>
                <button
                  onClick={() => handleTrackOnClick(delivery.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Track on Map
                </button>
              </div>
              {/* Render the map for the delivery */}
              <DeliveryMap deliveryLocation={delivery.location} />
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delivery History</h2>
          <ul>
            {deliveryHistory.map(historyItem => (
              <li key={historyItem.id} className="mb-2 p-2 border-b border-gray-200">
                Delivery #{historyItem.id} - Status: {historyItem.status} - Delivered on: {historyItem.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
