import { createEmployee } from '../controllers/employee.controller.js';
import Employee from '../model/employee.model.js';


jest.mock('../model/employee.model.js', () => {
 
  const saveMock = jest.fn().mockResolvedValue(true);
  return function() {
    return { save: saveMock };
  };
});

describe('Employee Controller', () => {
  let req, res;
  const saveMock = new Employee().save;  

  beforeEach(() => {
    req = {
      body: {
        employeeId: 'E123',
        name: 'John Doe',
        taskDescription: 'Developing features',
        availability: true
      }
    };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEmployee', () => {
    it('should create a new employee and respond with the employee data', async () => {
      await createEmployee(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201); 
      expect(res.json).toHaveBeenCalled();
    });

    it('should handle errors when employee creation fails', async () => {
      saveMock.mockRejectedValueOnce(new Error("Error creating employee"));

      await createEmployee(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
