import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  taskDescription: {
    type: String
  },
  availability: {
    type: Boolean,
    default: true // true means available and false means unavailable
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
