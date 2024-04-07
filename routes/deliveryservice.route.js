import express from 'express';
import { addDeliveryService, 
        getDeliveryServices , 
        searchDeliveryServices , 
        filterDeliveryServices , 
        deleteDeliveryServiceByTitle } from '../controllers/deliveryservices.controller.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();
  
/* start Ismail DMS-78 */
// Protect the routes with verifyToken
router.post('/add-service', verifyToken, addDeliveryService);
router.get('/delivery-services', verifyToken, getDeliveryServices);
/* end Ismail DMS-78 */
router.get('/search', verifyToken, searchDeliveryServices);
router.get('/filter', verifyToken, filterDeliveryServices);
router.delete('/delete-service-by-title/:title', verifyToken, deleteDeliveryServiceByTitle);


export default router;

