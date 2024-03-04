import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus, updateOrderGeolocation } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.patch('/update-status', updateOrderStatus);
router.patch('/update-geolocation/:orderId', updateOrderGeolocation); 

export default router;
