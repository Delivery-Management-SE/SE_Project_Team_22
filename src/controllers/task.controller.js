import Employee from '../model/employee.model.js';

export const assignTask = async (req, res) => {
  try {
    const { taskId, employeeId } = req.body;

    // Check if employee exists
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Check employee availability
    if (!employee.availability) {
      return res.status(400).json({ message: 'Employee is not available for assignment' });
    }

    // Assign task to employee
    employee.taskId = taskId;
    await employee.save();

    res.status(200).json({ message: 'Task assigned successfully', employee });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ message: 'Error assigning task', error: error.message });
  }
};
