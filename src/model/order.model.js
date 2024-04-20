import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true }
}, { _id: false });  // _id: false is optional to prevent MongoDB from creating a default _id for subdocuments

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    deliveryService: {
        type: String,
        required: true
    },
    pickupAddress: addressSchema,  // Using the address schema for pickup address
    deliveryAddress: addressSchema,  // Using the address schema for delivery address
    orderItems: [{
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentDetails: {
        type: String,
        required: true
    },
    geolocation: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'In Transit', 'Delivered'],
        default: 'Pending'
    },
    estimatedelivery:{
        type: Date,
       
    },
    driver: {
        type: String,
        ref: 'Employee'  // Assuming you have an Employee model
    },
    time: {
        type: Date,
        default: Date.now
    },
    Review :{
        type :Boolean,
        default : false,
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
