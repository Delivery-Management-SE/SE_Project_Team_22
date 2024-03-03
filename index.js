import express from 'express';
import mongoose from "mongoose";
import authRoutes from './routes/auth.route.js'
import serviceRoutes from './routes/deliveryservice.route.js';
import orderRouter from './routes/order.route.js'
import employeeRoutes from './routes/employee.route.js'; 
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

mongoose.connect("mongodb+srv://test:test@blog.w3skzwn.mongodb.net/blog?retryWrites=true&w=majority")
app.use(express.json());
app.get('/test' , (req,res) =>{
    res.json({message : "API"});
});

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes); /* Ismail DMS-78 */
app.use('/api/orders', orderRouter);
app.use('/api/employees', employeeRoutes);
// app.use(express.static(path.join(__dirname, '/backend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});