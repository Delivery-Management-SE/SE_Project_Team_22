import express from 'express';
import { google, signin, signup ,forgotPassword , resetPassword , sendOTP} from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/sendotp' , sendOTP)

export default router;