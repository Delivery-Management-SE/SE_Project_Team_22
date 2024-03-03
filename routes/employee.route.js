import express from 'express';
import { getEmployees,createEmployee } from '../controllers/employee.controller.js';

const router = express.Router();

router.get('/emp-chk', getEmployees);
router.post('/emp-chk', createEmployee);


export default router;
