const entitiesService = require('../../src/services/entities.service');
const entityController = require('../../src/controllers/entities.controller');

describe('Entities Controller', () => {
  describe('POST /entity', () => {
    it('should return 201 created', async () => {
      jest.spyOn(entitiesService, 'createPost').mockResolvedValue({
        type: "POST",
        caption: "lorem ipsum",
        imageURL: ["abc.jpg"],
        meta: {
          date: "10 Feb 2023",
          venue: "Brigade"
        },
        location: ["Mumbai", "Bangalore"],
        createdBy: "Aditya"
      });

      const mockReq = {
        body: jest.fn()
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await entityController.entityController(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({
        type: "POST",
        caption: "lorem ipsum",
        imageURL: ["abc.jpg"],
        meta: {
          date: "10 Feb 2023",
          venue: "Brigade"
        },
        location: ["Mumbai", "Bangalore"],
        createdBy: "Aditya"
      });
    });

    it('should throw 500', async () => {
      jest.spyOn(entitiesService, 'createPost').mockRejectedValue(new Error('Internal Server Error'));

      const mockReq = {
        body: jest.fn()
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await entityController.entityController(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
    });
  });
});