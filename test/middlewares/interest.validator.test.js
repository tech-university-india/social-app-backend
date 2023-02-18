const interestValidator = require('../../src/middlewares/interest.validator');

describe('Interest Validator', () => {
	describe('Post Interest Validator', () => {
		it('should return nothing if all fields are valid', async () => {
			const mockReq = {
				body: {
					interestName: 'test'
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnValue({ json: jest.fn() })
			};
			const mockNext = jest.fn();
			await interestValidator.postInterestValidator(mockReq, mockRes, mockNext);
			expect(mockNext).toBeCalled();
		}
		);
		it('should return 400 "interestName is required"', async () => {
			const mockReq = {
				body: {
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnValue({ json: jest.fn() })
			};
			const mockNext = jest.fn();
			await interestValidator.postInterestValidator(mockReq, mockRes, mockNext);
			expect(mockRes.status).toBeCalledWith(400);
			expect(mockRes.status().json).toBeCalledWith({ message: '"interestName" is required' });
			expect(mockNext).not.toBeCalled();
		}
		);
		it('should return 400 "interestName must be a string"', async () => {
			const mockReq = {
				body: {
					interestName: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnValue({ json: jest.fn() })
			};
			const mockNext = jest.fn();
			await interestValidator.postInterestValidator(mockReq, mockRes, mockNext);
			expect(mockRes.status).toBeCalledWith(400);
			expect(mockRes.status().json).toBeCalledWith({ message: '"interestName" must be a string' });
			expect(mockNext).not.toBeCalled();
		}
		);
	}
	);
}
);