import express from 'express';
import { createOrder, 
    getAllOrders, 
    updateOrderStatus, 
    updateOrderGeolocation, 
    getOrderById, 
    getOrdersByCustomer, 
    getOrdersByStatus, 
    getOrdersByEmail ,
    addreview ,
    getreview,
    getstat,
    getMonthlyOrderCount,
    getYearlyOrderStats} from '../controllers/order.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Place specific routes before general ones
router.get('/email', verifyToken, getOrdersByEmail); // Make sure this comes before routes that could conflict
router.get('/getreview/:deliveryservice', getreview);
router.get('/profile', verifyToken,getstat);
router.get('/monthly-orders', verifyToken, getMonthlyOrderCount);
router.get('/yearly-orders', verifyToken, getYearlyOrderStats);



router.post('/', verifyToken, createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);  // This could interpret 'email' as an ID if placed before '/email'
router.get('/customer/:email', getOrdersByCustomer);
router.get('/status/:status', getOrdersByStatus);

router.patch('/update-status', updateOrderStatus);
router.patch('/update-geolocation/:orderId', updateOrderGeolocation);

router.post('/review', addreview);



export default router;
