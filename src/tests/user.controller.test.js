import {
    signup,
    signin,
  } from '../controllers/auth.controller.js';
  import User from '../model/user.model.js'; 
  
  import bcryptjs from 'bcryptjs';
  import jwt from 'jsonwebtoken';
  
  
  jest.mock('../model/user.model'); 
  jest.mock('../model/resetTokenModel'); 
  jest.mock('bcryptjs'); 
  jest.mock('jsonwebtoken'); 
  jest.mock('nodemailer'); 
  jest.mock('crypto'); 
  
  describe('Authentication Controller', () => {
    let req, res, next;
  
    beforeEach(() => {
      req = {
        body: {},
        user: {}, 
      };
      res = {
        json: jest.fn(),
        status: jest.fn(() => res),
      };
      next = jest.fn();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('signup', () => {
      it('should create a new user and return success message', async () => {
        req.body = {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password',
          securityQuestion: 'What is your pet name?',
          securityAnswer: 'Fido',
          userType: 'user',
        };
  
        User.prototype.save.mockResolvedValue();
  
        await signup(req, res, next);
  
        expect(User.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('Signup successful');
      });
  
    
    });
  
    describe('signin', () => {
      it('should sign in user and return a JWT token', async () => {
        req.body = {
          email: 'test@example.com',
          password: 'password',
          userType: 'user',
        };
  
        const user = {
          email: req.body.email,
          password: 'hashedPassword', 
          userType: 'user',
          mailverified: 'verified',
        };
  
        User.findOne.mockResolvedValue(user); 
  
        bcryptjs.compareSync.mockReturnValue(true); 
  
        jwt.sign.mockReturnValue('mockedToken'); 
  
        await signin(req, res, next);
  
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcryptjs.compareSync).toHaveBeenCalledWith(
          req.body.password,
          user.password
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken' });
      });
  
      
    });
  
   
  });
  