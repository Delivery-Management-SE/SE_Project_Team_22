import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function OrderPayment() {
  const [orderData, setOrderData] = useState({
    orderId: '123456789',
    paymentAmount: 100,
    review: '',
    estimatedDeliveryDate: 'February 28, 2024', 
    pastOrderId: '987654321' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(orderData);
   
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
         
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
            <input type="text" id="orderId" name="orderId" placeholder="Order ID" aria-label="Order ID" required className="border-2 border-gray-200 p-2 rounded-md" value={orderData.orderId} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">Payment Amount</label>
            <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Payment Amount" aria-label="Payment Amount" required className="border-2 border-gray-200 p-2 rounded-md" value={orderData.paymentAmount} onChange={handleChange} />
          </div>
          <div>
            <p className="text-sm text-gray-700 mt-2">Estimated Delivery Date: {orderData.estimatedDeliveryDate}</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Rate your past orders</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="pastOrderId" className="block text-sm font-medium text-gray-700">Order ID</label>
              <input type="text" id="pastOrderId" name="pastOrderId" placeholder="Past Order ID" aria-label="Past Order ID" required className="border-2 border-gray-200 p-2 rounded-md" value={orderData.pastOrderId} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea id="review" name="review" placeholder="Write your review here" aria-label="Review" className="border-2 border-gray-200 p-2 rounded-md" value={orderData.review} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderPayment;
