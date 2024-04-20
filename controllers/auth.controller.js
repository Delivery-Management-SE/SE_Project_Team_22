import User from '../model/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import ResetToken from '../model/resetTokenModel.js'; // Model to store reset tokens

export const signup = async (req, res, next) => {
  const { username, email, password, securityQuestion, securityAnswer ,userType } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !securityQuestion ||
    !securityAnswer ||
    !userType ||
    username === '' ||
    email === '' ||
    password === '' ||
    securityQuestion === '' ||
    securityAnswer === ''||
    userType === ''

  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    securityQuestion,
    securityAnswer,
    userType,
    mailverified : "unverified"
  });

  try {
    await newUser.save();
    res.status(200).json('Signup successful');
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET;
  const { email, password , userType } = req.body;

  if (!email || !password || !userType || email === '' || password === ''|| userType ==='') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    if( user.mailverified == "unverified"){
      return next(errorHandler(400 , 'unverified user'))
    }
    //console.log(SECRET_KEY)
    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, userType: user.userType },
      SECRET_KEY, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({ token });
    // res.status(200).json({ securityQuestion: validUser.securityQuestion ,
    //   securityAnswer : validUser.securityAnswer   });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {

  const { username,email , profilePicture } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // Update JWT token to include email and userType
      const token = jwt.sign(
        { email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
      const { password, ...rest } = user._doc;
      res.status(200).json({ token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
        username.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: profilePicture,
        userType: 'user', // Assign a default userType, update as needed
        mailverified :'verified'
      });
      await newUser.save();
      // Update JWT token to include email and userType
      const token = jwt.sign(
        { email: newUser.email, userType: newUser.userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
      const { password, ...rest } = newUser._doc;
      res.status(200).json({ token });
    }
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res) => {

  const { username, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error in changing the password', error: error.message });
  }
};


// Step 1 & 2: Generate token and store it
export const forgotPassword = async (req, res, next) => {
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_ID = process.env.MAIL_ID;
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const resetToken = new ResetToken({
      userId: user._id,
      token: token,
      expires: new Date(Date.now() + 3600000), // 1 hour
    });
    await resetToken.save();

    // Step 3: Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_ID,
        pass: MAIL_PASS,
      },
    });

    const resetUrl = process.env.PASSWORD_RESET_URL + token;
    const mailOptions = {
      from: MAIL_ID,
      to: user.email,
      subject: 'Password Reset',
      text: `Please click on the following link to reset your password: ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Password reset email sent' });
      }
    });
  } catch (error) {
    next(error);
  }
    // const resetLink = `http://localhost:3000/api/auth/reset-password/${resetToken}`;
    // console.log(`Password reset link: ${resetLink}`);

    //     res.status(200).json({ message: 'Password reset link has been generated',resetLink });
    // } catch (error) {
    //     res.status(500).json({ message: 'Error in generating password reset link', error: error.message });
    // }
};

// Step 4: Reset Password Endpoint
export const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;
  try {
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken || resetToken.expires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword; // Assume you have a pre-save hook to hash the password
    await user.save();
    await ResetToken.deleteOne({ token });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};


const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000); // Generates a 6-digit OTP
};

export const sendOTP = async (req, res, next) => {
  const MAIL_PASS = process.env.MAIL_PASS;
  const MAIL_ID = process.env.MAIL_ID;
  const { email } = req.body;

  if (!email) {
    return next({ status: 400, message: 'Email is required' });
  }

  const otp = generateOTP();
  const otpExpires = new Date();
  otpExpires.setMinutes(otpExpires.getMinutes() + 10);  // OTP expires in 10 minutes

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { otp: { value: otp, expires: otpExpires } },
      { new: true, upsert: true }  // upsert true will create a new document if the user does not exist
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_ID,
        pass: MAIL_PASS
      }
    });

    const mailOptions = {
      from: MAIL_ID,
      to: email,
      subject: 'Verify your account',
      text: `Your OTP for account verification is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return next({ status: 500, message: 'Failed to send OTP' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'OTP sent to email successfully' });
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    next({ status: 500, message: 'Server error' });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP has expired or is incorrect
    if (user.otp.expires < new Date() || user.otp.value !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update the mailVerified status
    user.mailVerified = 'verified';
    user.otp = null; // Clear the OTP
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

export const completeProfile = async (req, res, next) => {
  const { firstName, lastName, street, apt, zipcode, mobile } = req.body;
  const email = req.user.email; // Extracted from the token

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { firstName, lastName, street, apt, zipcode, mobile },
      { new: true }
    );
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    next(error);
  }
};

export const getuser = async (req, res) => {
  const email = req.user.email; // Email is retrieved from decoded token stored by verifyToken middleware

  try {
      const user = await User.findOne({ email: email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
// Convert to object and exclude sensitive and unnecessary data
const userObject = user.toObject();
const {
    password,
    _id,
    userType,
    securityQuestion,
    securityAnswer,
    createdAt,
    updatedAt,
    __v,
    ...userWithoutSensitiveData
} = userObject;

res.json(userWithoutSensitiveData);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};