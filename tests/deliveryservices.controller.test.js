import { addDeliveryService, getDeliveryServices, searchDeliveryServices, filterDeliveryServices } from '../controllers/deliveryservices.controller.js';
import DeliveryService from '../model/deliveryservice.model.js';

jest.mock('../model/deliveryservice.model.js');

describe('addDeliveryService', () => {
    it('should add a new delivery service', async () => {
        const mockReq = {
            body: {
                deliveryServiceTitle: 'Title',
                deliverServiceType: 'Type',
                deliveryServiceDescription: 'Description',
                deliverServiceCompany: 'Company',
                deliverServicePrice: 10,
            },
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await addDeliveryService(mockReq, mockRes);

        expect(DeliveryService.prototype.save).toHaveBeenCalled();

        // const expectedResponse = {
        //     deliveryServiceTitle: 'Title',
        //     deliverServiceType: 'Type',
        //     deliveryServiceDescription: 'Description',
        //     deliverServiceCompany: 'Company',
        //     deliverServicePrice: 10,
        // };

        expect(mockRes.status).toHaveBeenCalledWith(201);
        //expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
    });


    it('should return a 400 error if required fields are missing', async () => {
        const mockReq = {
            body: {},
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await addDeliveryService(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'title, type, company, and price are required',
        });
    });

    it('should return a 500 error for internal server error', async () => {
        const mockReq = {
            body: {
                deliveryServiceTitle: 'Title',
                deliverServiceType: 'Type',
                deliveryServiceDescription: 'Description',
                deliverServiceCompany: 'Company',
                deliverServicePrice: 10,
            },
        };

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        DeliveryService.prototype.save.mockImplementationOnce(() => {
            throw new Error('Some error');
        });

        await addDeliveryService(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Internal Server Error',
        });
    });
});

describe('getDeliveryServices', () => {
    it('should return a list of delivery services', async () => {

        DeliveryService.find.mockResolvedValue([
        {
          deliveryServiceTitle: 'Test Title',
          deliverServiceType: 'Test Type',
          deliveryServiceDescription: 'Test Description',
          deliverServiceCompany: 'Test Company',
          deliverServicePrice: 123,
        },
      ]);
  
      const mockRes = {
        send: jest.fn(),
      };
  
      const mockNext = jest.fn();
  
      await getDeliveryServices(null, mockRes, mockNext);
  
      expect(mockRes.send).toHaveBeenCalledWith([
        {
          deliveryServiceTitle: 'Test Title',
          deliverServiceType: 'Test Type',
          deliveryServiceDescription: 'Test Description',
          deliverServiceCompany: 'Test Company',
          deliverServicePrice: 123,
        },
      ]);
      expect(mockNext).not.toHaveBeenCalled();
    });    
});
  
describe('searchDeliveryServices', () => {

    afterEach(() => {
      jest.resetAllMocks(); 
    });
  
    it('should return matching delivery services when a valid search key is provided', async () => {
      const req = {
        query: {
          key: 'searchTerm',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const findMock = jest.spyOn(DeliveryService, 'find').mockResolvedValue(['matchingService']);
  
      await searchDeliveryServices(req, res);
  
      expect(findMock).toHaveBeenCalledWith({
        $or: [
          { deliveryServiceTitle: expect.any(RegExp) },
          { deliverServiceType: expect.any(RegExp) },
          { deliveryServiceDescription: expect.any(RegExp) },
          { deliverServiceCompany: expect.any(RegExp) },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['matchingService']);
    });
  
    it('should return all delivery services when no search key is provided', async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const findMock = jest.spyOn(DeliveryService, 'find').mockResolvedValue(['allServices']);
  
      await searchDeliveryServices(req, res);
  
      expect(findMock).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['allServices']);
    });
  
    it('should handle errors and return a 500 status with an error message', async () => {
      const req = {
        query: {
          key: 'searchTerm',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const findMock = jest.spyOn(DeliveryService, 'find').mockRejectedValue(new Error('Database error'));
  
      await searchDeliveryServices(req, res);
  
      expect(findMock).toHaveBeenCalledWith({
        $or: [
          { deliveryServiceTitle: expect.any(RegExp) },
          { deliverServiceType: expect.any(RegExp) },
          { deliveryServiceDescription: expect.any(RegExp) },
          { deliverServiceCompany: expect.any(RegExp) },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching delivery services',
        error: 'Database error',
      });
    });
});
  
describe('filterDeliveryServices function', () => {
    afterEach(() => {
      jest.resetAllMocks(); // Reset mocks after each test
    });
  
    it('should return filtered delivery services by title', async () => {
      const req = {
        query: {
          title: 'filterTitle',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const findMock = jest.spyOn(DeliveryService, 'find').mockResolvedValue(['filteredService']);
  
      await filterDeliveryServices(req, res);
  
      expect(findMock).toHaveBeenCalledWith({
        deliveryServiceTitle: { $regex: 'filterTitle', $options: 'i' },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['filteredService']);
    });
  
    it('should return filtered delivery services by type, company, and price range', async () => {
      const req = {
        query: {
          type: 'filterType',
          company: 'filterCompany',
          minPrice: 10,
          maxPrice: 50,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const findMock = jest.spyOn(DeliveryService, 'find').mockResolvedValue(['filteredService']);
  
      await filterDeliveryServices(req, res);
  
      expect(findMock).toHaveBeenCalledWith({
        deliverServiceType: { $regex: 'filterType', $options: 'i' },
        deliverServiceCompany: { $regex: 'filterCompany', $options: 'i' },
        deliverServicePrice: { $gte: 10, $lte: 50 },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['filteredService']);
    });
  
    it('should handle errors and return a 500 status with an error message', async () => {
      const req = {
        query: {
          title: 'filterTitle',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const findMock = jest.spyOn(DeliveryService, 'find').mockRejectedValue(new Error('Database error'));
  
      await filterDeliveryServices(req, res);
  
      expect(findMock).toHaveBeenCalledWith({
        deliveryServiceTitle: { $regex: 'filterTitle', $options: 'i' },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching delivery services',
        error: 'Database error',
      });
    });
});
  