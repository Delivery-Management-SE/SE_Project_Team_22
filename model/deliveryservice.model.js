import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/* Updated DeliveryService Schema */
const deliveryServiceSchema = new Schema({
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
  },
  deliverServiceWeightLimit: { // Assuming you want to store weight limit
    type: Number,
    required: true
  },
  deliveryServiceDimensions: { // To store dimensions of the package
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  deliverServiceLocations: [{ // Array of locations the service is available
    type: String,
    required: true
  }]
}, { timestamps: true });

const DeliveryService = mongoose.model('DeliveryService', deliveryServiceSchema);

export default DeliveryService;


/* end Ismail DMS-78 */