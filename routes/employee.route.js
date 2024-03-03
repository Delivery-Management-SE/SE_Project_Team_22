import express from 'express';
import { getEmployees,createEmployee } from '../controllers/employee.controller.js';
import { assignTask } from '../controllers/task.controller.js';

const router = express.Router();

router.get('/emp-chk', getEmployees);
router.post('/emp-chk', createEmployee);
router.post('/assign-task', assignTask); // New route for task assignment

export default router;
