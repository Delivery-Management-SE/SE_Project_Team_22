import DeliveryService from '../model/deliveryservice.model.js';
import { errorHandler } from '../utils/error.js';

/* start Ismail DMS-78 */
export const addDeliveryService = async (req, res) => {
    try {
        const { deliveryServiceTitle, deliverServiceType, deliveryServiceDescription, deliverServiceCompany, deliverServicePrice } = req.body;

        if (!deliveryServiceTitle || !deliverServiceType || !deliverServiceCompany || !deliverServicePrice) {
            return res.status(400).json({ error: 'title, type, company, and price are required' });
        }
        const newDeliveryService = new DeliveryService({
            deliveryServiceTitle,
            deliverServiceType,
            deliveryServiceDescription,
            deliverServiceCompany,
            deliverServicePrice,
        });

        await newDeliveryService.save();

        res.status(201).json(newDeliveryService);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getDeliveryServices = async (req, res, next) => {

    DeliveryService.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
/* end Ismail DMS-78 */