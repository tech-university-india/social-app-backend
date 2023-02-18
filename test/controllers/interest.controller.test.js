const interestController = require('../../src/controllers/interest.controller');
const interestService = require('../../src/services/interest.service');
const HTTPError = require('../../src/errors/httperror');

describe('Interest Controller', () => {
	describe('POST /interest', () => {
		it('should return 201 with interest', async () => {
			const interest = {
				'id': 1,
				'interestName': 'Fishing'
			};
			jest.spyOn(interestService, 'postInterest').mockResolvedValue(interest);
			const mockReq = {
				body: { 'interestName': 'Fishing' },
				user: { id: 1 }
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			await interestController.postInterest(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(201);
			expect(mockRes.json).toBeCalledWith(interest);
		});
		it('should throw HTTPError', async () => {
			jest.spyOn(interestService, 'postInterest').mockRejectedValue(new HTTPError(400, 'Service Error'));
			const mockReq = {
				body: { 'interestName': 'Fishing' },
				user: { id: 1 }
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			await interestController.postInterest(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(400);
			expect(mockRes.json).toBeCalledWith({ message: 'Service Error' });
		});
		it('should throw 500', async () => {
			jest.spyOn(interestService, 'postInterest').mockRejectedValue(new Error('Service Error'));
			const mockReq = {
				body: { 'interestName': 'Fishing' },
				user: { id: 1 }
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			await interestController.postInterest(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(500);
			expect(mockRes.json).toBeCalledWith({ message: 'Service Error' });
		});
	}
	);
});