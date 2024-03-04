import Order from '../model/order.model.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error: error.message });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('deliveryService');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error updating order status', error: error.message });
    }
};

export const updateOrderGeolocation = async (req, res) => {
    const orderId = req.params.orderId; // Retrieve orderId from path parameters
    const { geolocation } = req.body; // Retrieve geolocation from request body
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { geolocation }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error updating order geolocation', error: error.message });
    }
};