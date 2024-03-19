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
    userType
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Send security question to the client
    res.status(200).json({ securityQuestion: validUser.securityQuestion ,
                           securityAnswer : validUser.securityAnswer   });
  } catch (error) {
    next(error);
  }

    // Temporarily bypassing JWT
    // const token = jwt.sign(
    //   { id: validUser._id, isAdmin: validUser.isAdmin },
    //   process.env.JWT_SECRET
    // );

    //const { password: pass, ...rest } = validUser._doc;

    //res
    //  .status(200)
      // .cookie('access_token', token, {
      //   httpOnly: true,
      // })
    //  .json(rest);
 // } catch (error) {
  //  next(error);
 // }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


// Step 1 & 2: Generate token and store it
export const forgotPassword = async (req, res, next) => {
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
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'deliver.ease.se.2023@gmail.com',
    //     pass: 'MERN@2024',
    //   },
    // });

  //   const resetUrl = `http://your-frontend-url/reset-password?token=${token}`;
  //   const mailOptions = {
  //     from: 'deliver.ease.se.2023@gmail.com',
  //     to: user.email,
  //     subject: 'Password Reset',
  //     text: `Please click on the following link to reset your password: ${resetUrl}`,
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).json({ message: 'Error sending email' });
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //       return res.status(200).json({ message: 'Password reset email sent' });
  //     }
  //   });
  // } catch (error) {
  //   next(error);
  // }
    const resetLink = `http://localhost:3000/api/auth/reset-password/${resetToken}`;
    console.log(`Password reset link: ${resetLink}`);

        res.status(200).json({ message: 'Password reset link has been generated',resetLink });
    } catch (error) {
        res.status(500).json({ message: 'Error in generating password reset link', error: error.message });
    }
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
  const { email } = req.body;

  if (!email) {
    return next(errorHandler(400, 'Email is required'));
  }

  const otp = generateOTP();
  
  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bpnivedithausa@gmail.com',
      pass: 'feiqtkvcwgqtroxc'  // Use the 16-character App Password here
    }
  });

  const mailOptions = {
    from: 'bpnivedithausa@gmail.com',
    to: email,
    subject: 'Verify your account',
    text: `Your OTP for account verification is ${otp}`
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return next(error);
    } else {
      console.log('Email sent: ' + info.response);
      // Sending OTP in response for testing purposes
      res.json({ message: 'OTP sent to email', otp });
    }
  });
};