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
router.post('/add-service', addDeliveryService);
router.get('/delivery-services', getDeliveryServices);
/* end Ismail DMS-78 */
router.get('/search', searchDeliveryServices);
router.get('/filter', filterDeliveryServices);
router.delete('/delete-service-by-title/:title', verifyToken, deleteDeliveryServiceByTitle);


export default router;

