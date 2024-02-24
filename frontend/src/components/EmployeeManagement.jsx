import React, { useState } from 'react';

function EmployeeManagement() {
  const [employeeData, setEmployeeData] = useState({
    employeeCode: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submission logic here
    console.log(employeeData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Employee Management</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="employeeCode" className="block text-sm font-medium text-gray-700">Employee Code</label>
          <input type="text" id="employeeCode" name="employeeCode" placeholder="Employee Code" aria-label="Employee Code" required className="border-2 border-gray-200 p-2 rounded-md" value={employeeData.employeeCode} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="First Name" aria-label="First Name" required className="border-2 border-gray-200 p-2 rounded-md" value={employeeData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Last Name" aria-label="Last Name" required className="border-2 border-gray-200 p-2 rounded-md" value={employeeData.lastName} onChange={handleChange} />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeManagement;
