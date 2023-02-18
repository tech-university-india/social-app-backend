const interestController = require('../../src/controllers/interest.controller');
const interestService = require('../../src/services/interest.service');

describe('Interest Controller', () => {
	describe('POST /interest', () => {
		it('should return 201 with interest', async () => {
			const interest = {
				'id': 1,
				'interestName': 'Fishing'
			};
			jest.spyOn(interestService, 'postInterest').mockResolvedValue(interest);
			const mockReq = { body: {
				'interestName': 'Fishing'
			} };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			await interestController.postInterest(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(201);
			expect(mockRes.json).toBeCalledWith(interest);
		});
		it('should throw 501', async () => {
			jest.spyOn(interestService, 'postInterest').mockRejectedValue(new Error());
			const mockReq = { body: { 'interestName': 'Fishing' } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			await interestController.postInterest(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(501);
			expect(mockRes.json).toBeCalledWith({message: 'Invalid Data'});
		});
	}
	);
});