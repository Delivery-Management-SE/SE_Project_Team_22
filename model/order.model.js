import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    deliveryService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryService',
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    geolocation: {
        type: String 
    },
    orderItems: [{
        itemName: String,
        quantity: Number,
        price: Number
    }],
    status: {
        type: String,
        enum: ['Pending', 'In Transit', 'Delivered'],
        default: 'Pending'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
