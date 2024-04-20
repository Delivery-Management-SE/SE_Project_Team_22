import Order from '../model/order.model.js';
import Review from '../model/reviewModel.js';
import nodemailer from 'nodemailer';

// Create a new order
export const createOrder = async (req, res, next) => {
    try {
        const orderData = {
            email: req.user.email,
            ...req.body
        };

        const newOrder = new Order(orderData);
        await newOrder.save();

        // Send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_ID,
            to: orderData.email,
            subject: 'Order Confirmation',
            text: `Hi ${orderData.customerName}, your order has been placed successfully. Your tracking ID is ${newOrder._id}. Please use this ID to track your order status.`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error('Error sending order confirmation email:', error);
                return next({ status: 500, message: 'Failed to send order confirmation email' });
            } else {
                console.log('Order confirmation email sent: ' + info.response);
            }
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(400).json({ message: 'Error creating order', error: error.message });
    }
};

export const  addreview = async (req , res)=> {
    try {
        const newReview = new Review(req.body);
        await newReview.save();
        res.status(200).json(newReview);
      } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Error creating reivew', error: error.message });
      }
}

export const getreview = async (req, res) => {
    console.log("Delivery Service:", req.params.deliveryservice);  // Log the incoming parameter to debug
    try {
        const reviews = await Review.find({ delivery: req.params.deliveryservice });
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this delivery service.' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.log("Error fetching reviews:", error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};



// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
};

// Get orders by customer email
export const getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await Order.find({ email: req.params.email });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this customer' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};

// Get orders by status
export const getOrdersByStatus = async (req, res) => {
    try {
        const orders = await Order.find({ status: req.params.status });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found with this status' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};
export const getOrdersByEmail = async (req, res) => {
    const email = req.user.email;
    const status = req.query.status;  // Optional status filter

    try {
        const query = { email };
        if (status) {
            query.status = status;
        }

        const orders = await Order.find(query);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

export const getstat = async (req, res) => {
    const email = req.user.email;  // Assuming the email is extracted from the authenticated user
    const status = req.query.status;  // Optional status filter

    try {
        const query = { email: email };
        if (status) {
            query.status = status;
        }

        // Fetch all orders for the user, optionally filtered by status
        const orders = await Order.find(query);

        // Calculate statistics
        const number_of_orders = orders.length;
        const total_spend = orders.reduce((acc, order) => acc + order.total, 0);
        const average_cost_per_order = number_of_orders ? (total_spend / number_of_orders) : 0;
        const delivered = orders.filter(order => order.status === "Delivered").length;
        const pending = orders.filter(order => order.status === "Pending").length;
        const last_order = orders[orders.length - 1]; // Assumes orders are sorted by date, latest last

        // Respond with calculated statistics
        res.json({
            number_of_orders,
            total_spend,
            average_cost_per_order,
            delivered,
            pending,
            last_order: last_order ? {
                id: last_order._id,
                status: last_order.status,
                total: last_order.total,
                time: last_order.time
            } : null
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
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

export const getMonthlyOrderCount = async (req, res) => {
    const email = req.user.email;  // Extracting email from the authenticated user

    // Getting the first day of the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Set to the first day of the month
    startOfMonth.setHours(0, 0, 0, 0); // Set to the start of the day

    // Getting the current date to define the range of the current month up to now
    const endOfMonth = new Date();

    try {
        const orderCount = await Order.countDocuments({
            email: email,
            createdAt: {
                $gte: startOfMonth, // Greater than or equal to the start of the month
                $lte: endOfMonth // Less than or equal to the current date
            }
        });

        // Respond with the count of orders
        res.json({
            month: startOfMonth.getMonth() + 1, // Month is zero-indexed, thus add 1
            year: startOfMonth.getFullYear(),
            orderCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving monthly order count', error: error.message });
    }
};

export const getYearlyOrderStats = async (req, res) => {
    const email = req.user.email;  // Extracting email from the authenticated user
    const year = req.query.year || new Date().getFullYear();  // Default to the current year if not specified

    try {
        const ordersByMonth = await Order.aggregate([
            {
                $match: {
                    email: email,
                    createdAt: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }  // Sort by month (_id)
            }
        ]);

        // Create an array of 12 elements initialized to 0 to hold the counts for each month
        const monthlyOrderCounts = new Array(12).fill(0);
        ordersByMonth.forEach(order => {
            if (order._id >= 1 && order._id <= 12) {
                monthlyOrderCounts[order._id - 1] = order.count;  // Array index is month-1 because months are 1-indexed in the output
            }
        });

        res.json({monthlyOrderCounts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving yearly order statistics', error: error.message });
    }
};

