import React, { useState } from 'react';

function BookingDelivery() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    deliveryDate: '',
    packageSize: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <nav className="flex justify-between items-center mb-8">
        <div>
          <strong>Delivery Service</strong>
        </div>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Home</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600">Book Delivery</a></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600" role="button">Contact Us</a></li>
        </ul>
      </nav>
      <main>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <h2 className="text-2xl font-bold mb-2">Book Your Delivery</h2>
          <input type="text" name="pickupLocation" placeholder="Pickup Location" aria-label="Pickup Location" required className="border-2 border-gray-200 p-2 rounded-md" value={formData.pickupLocation} onChange={handleChange} />
          <input type="text" name="dropoffLocation" placeholder="Dropoff Location" aria-label="Dropoff Location" required className="border-2 border-gray-200 p-2 rounded-md" value={formData.dropoffLocation} onChange={handleChange} />
          <input type="date" name="deliveryDate" aria-label="Preferred Delivery Date" required className="border-2 border-gray-200 p-2 rounded-md" value={formData.deliveryDate} onChange={handleChange} />
          <input type="text" name="packageSize" placeholder="Package Size" aria-label="Package Size" required className="border-2 border-gray-200 p-2 rounded-md" value={formData.packageSize} onChange={handleChange} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Delivery</button>
        </form>
      </main>
      <footer className="mt-8 text-center">
        <small>
          <a href="#" className="text-blue-500 hover:text-blue-600">Privacy Policy</a> • <a href="#" className="text-blue-500 hover:text-blue-600">Terms of Service</a>
        </small>
      </footer>
    </div>
  );
}

export default BookingDelivery;
