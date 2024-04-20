
import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    delivery: { type: String, required: true }, // This will store deliveryServiceTitle
    customer: { type: String, required: true },
    date: { type: Date, default: Date.now },
    rating: { type: Number, required: true },
    comments: { type: String }
});


const Review = mongoose.model('Review', reviewSchema);
export default Review;
