import express from 'express';
import { google, 
        signin, 
        signup, 
        forgotPassword, 
        changePassword, 
        resetPassword , 
        sendOTP ,
        completeProfile} from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/change-password', changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/sendotp' , sendOTP)
router.post('/updateprofile' , completeProfile)

export default router;