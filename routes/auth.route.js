import express from 'express';
import { google, 
        signin, 
        signup, 
        forgotPassword, 
        changePassword, 
        resetPassword , 
        sendOTP ,
        verifyOtp,
        completeProfile,
        getuser} from '../controllers/auth.controller.js';
import verifyToken from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/sendotp' , sendOTP)
router.post('/verifyotp' , verifyOtp)
router.post('/updateprofile' , verifyToken,completeProfile)
router.get('/profile' , verifyToken,getuser)

export default router;