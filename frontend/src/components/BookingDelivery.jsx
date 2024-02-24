import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BookingDelivery() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
  });

  const [searchParams, setSearchParams] = useState({
    query: '',
    filter: 'all',
    deliveryService: 'all',
    priceRange: 'any',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Implement your submission logic here
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchParams);
    // Implement your search logic here
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <nav className="flex justify-between items-center mb-8">
        <div>
          <strong>Delivery Service</strong>
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-blue-500 hover:text-blue-600">Home</Link></li>
          <li><a href="#" className="text-blue-500 hover:text-blue-600" role="button">Contact Us</a></li>
          <li><Link to="/employee-management" className="text-blue-500 hover:text-blue-600" role="button">Employee Management</Link></li>
        </ul>
      </nav>
      <main>
        <section className="mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" name="query" placeholder="Search delivery services..." aria-label="Search Query" className="border-2 border-gray-200 p-2 rounded-md" value={searchParams.query} onChange={handleSearchChange} />
            <select name="filter" aria-label="Filter" className="border-2 border-gray-200 p-2 rounded-md" value={searchParams.filter} onChange={handleSearchChange}>
              <option value="all">All Items</option>
              <option value="heavyMachinery">Heavy Machinery</option>
              <option value="delicateItems">Delicate Items</option>
            </select>
            <select name="deliveryService" aria-label="Delivery Service" className="border-2 border-gray-200 p-2 rounded-md" value={searchParams.deliveryService} onChange={handleSearchChange}>
              <option value="all">All Delivery Services</option>
              <option value="standard">Standard Shipping</option>
              <option value="expedited">Expedited Delivery</option>
              <option value="sameDay">Same-Day Delivery</option>
            </select>
            <select name="priceRange" aria-label="Price Range" className="border-2 border-gray-200 p-2 rounded-md" value={searchParams.priceRange} onChange={handleSearchChange}>
              <option value="any">Any Price Range</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201-500">$201 - $500</option>
              <option value="501+">$501 and above</option>
            </select>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
          </form>
        </section>
        <section>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <h2 className="text-2xl font-bold mb-2">Book Your Delivery</h2>
            <input type="text" name="pickupLocation" placeholder="Pickup Location" aria-label="Pickup Location" required className="border-2 border-gray-200 p-2 rounded-md" value={formData.pickupLocation} onChange={handleChange} />
            <input type="text" name="dropoffLocation" placeholder="Dropoff Location" aria-label="Dropoff Location" required className="border-2 border-gray-200 p-2 rounded-md" value={formData.dropoffLocation} onChange={handleChange} />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Book Delivery</button>
          </form>
        </section>
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
