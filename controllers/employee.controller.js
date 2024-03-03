import Employee from '../model/employee.model.js';

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}, 'employeeId name taskDescription availability');
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { employeeId, name, taskDescription, availability } = req.body;
    console.log('Creating employee:', req.body); // Log request body
    const newEmployee = new Employee({ employeeId, name, taskDescription, availability });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};
