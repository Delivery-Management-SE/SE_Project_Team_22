import DeliveryService from '../model/deliveryservice.model.js';
import { errorHandler } from '../utils/error.js';

/* start Ismail DMS-78 */
export const addDeliveryService = async (req, res) => {
    try {
        
        const newDeliveryService = new DeliveryService(req.body);
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
export const searchDeliveryServices = async (req, res) => {
    try {
        const searchKey = req.query.key;
        let query = {};

        if (searchKey) {
            const regex = new RegExp(searchKey, 'i'); // Case-insensitive regex
            query = {
                $or: [
                    { deliveryServiceTitle: regex },
                    { deliverServiceType: regex },
                    { deliveryServiceDescription: regex },
                    { deliverServiceCompany: regex }
                ]
            };
        }

        const deliveryServices = await DeliveryService.find(query);
        res.status(200).json(deliveryServices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery services', error: error.message });
    }
};

export const filterDeliveryServices = async (req, res) => {
    try {
        const query = {};
        if (req.query.title) {
            query.deliveryServiceTitle = { $regex: req.query.title, $options: 'i' };
        }
        if (req.query.type) {
            query.deliverServiceType = { $regex: req.query.type, $options: 'i' };
        }
        if (req.query.company) {
            query.deliverServiceCompany = { $regex: req.query.company, $options: 'i' };
        }
        if (req.query.minPrice && req.query.maxPrice) {
            query.deliverServicePrice = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        }

        const deliveryServices = await DeliveryService.find(query);
        res.status(200).json(deliveryServices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery services', error: error.message });
    }
};