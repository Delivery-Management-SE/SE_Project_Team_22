import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/* start Ismail DMS-78 */

const deliveryServiceSchema  = new Schema({

    deliveryServiceTitle: {
        type: String,
        required: true
    },
    deliverServiceType: {
        type: String,
        required: true
    },
    deliveryServiceDescription: {
        type: String
    },
    deliverServiceCompany: {
        type: String,
        required: true
    },
    deliverServicePrice: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const DeliveryService = mongoose.model('DeliveryService', deliveryServiceSchema);

export default DeliveryService;

/* end Ismail DMS-78 */