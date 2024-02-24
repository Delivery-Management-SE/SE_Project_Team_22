import express from 'express';
import { addDeliveryService, getDeliveryServices } from '../controllers/deliveryservices.controller.js';

const router = express.Router();

/* start Ismail DMS-78 */
router.post('/add-service', addDeliveryService);
router.get('/delivery-services', getDeliveryServices);

export default router;
/* end Ismail DMS-78 */