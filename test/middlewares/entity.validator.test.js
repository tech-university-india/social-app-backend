
const entityValidator = require('../../src/middlewares/entities.validator');
describe('Entity Validator', () => {
  it('should return nothing if all fields are valid', () => {
    const mockReq = {
      body: {
        type: 'ANNOUNCEMENT',
        caption: 'lorem ipsum',
        imageURL: ['abc.jpg'],
        meta: {
          date: '10 Feb 2023',
          venue: 'Brigade'
        },
        location: ['Mumbai', 'Bangalore'],
        createdBy: 'Aditya'
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockNext = jest.fn();

    entityValidator.entityValidator(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });

  it('should throw an error', async () => {
    const mockReq = {
      body: jest.fn()
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockNext = jest.fn();

    await entityValidator.entityValidator(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
  });
});