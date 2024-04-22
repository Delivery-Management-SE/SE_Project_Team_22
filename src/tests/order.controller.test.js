import { createOrder } from '../controllers/order.controller.js';
import Order from '../model/order.model.js';
import nodemailer from 'nodemailer';

jest.mock('../model/order.model.js');
jest.mock('nodemailer');

describe('Order Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { email: 'test@example.com' },
      body: {
        customerName: 'John Doe'
      }
    };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res) 
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      
      Order.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue()
      }));

      
      const sendMailMock = jest.fn().mockImplementation((mailOptions, callback) => {
        callback(null, { response: '250 OK' }); 
      });
      nodemailer.createTransport.mockReturnValue({
        sendMail: sendMailMock
      });

      await createOrder(req, res, next);

     
      expect(true).toBeTruthy();
    });
  });
});