import React, { useState } from 'react';

function TrackingDelivery() {
  const [trackingID, setTrackingID] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    
    const status = fetchDeliveryStatusFromAPI(trackingID); 
    setDeliveryStatus(status);
  };

  const fetchDeliveryStatusFromAPI = (trackingID) => {
   
    
    const dummyData = {
      location: 'Your Location',
      status: 'In Transit',
      estimatedDelivery: '25th February 2024',
    };
    return dummyData;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Track Your Delivery</h1>
      <form onSubmit={handleTrack} className="mb-4">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingID}
          onChange={(e) => setTrackingID(e.target.value)}
          className="border-2 border-gray-200 p-2 rounded-md"
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Track</button>
      </form>
      {deliveryStatus && (
        <div>
          <h2 className="text-xl font-bold">Delivery Status:</h2>
          <p><strong>Location:</strong> {deliveryStatus.location}</p>
          <p><strong>Status:</strong> {deliveryStatus.status}</p>
          <p><strong>Estimated Delivery:</strong> {deliveryStatus.estimatedDelivery}</p>
        </div>
      )}
    </div>
  );
}

export default TrackingDelivery;