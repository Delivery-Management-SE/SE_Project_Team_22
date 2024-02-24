import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.patch('/update-status', updateOrderStatus);

export default router;
