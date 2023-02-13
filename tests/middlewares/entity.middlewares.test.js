const entityValidator = require('../../src/middlewares/entity.validator');

describe('Entity Validator', () => {

	describe('singleEntityValidator', () => {


		it('should call next function when entity id is a number', async () => {

			const request = {
				params: {
					entityId: 'not-a-number',
				},
			};
			const response = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
			};

			entityValidator.singleEntityValidator(request, response);

			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.status().json).toHaveBeenCalledWith({ message: '"entityId" must be a number' });

		});

		it('should return 400 status code when entity id is not a number', async () => {
			const request = {
				params: {
					entityId: 42,
				},
			};
			const response = {};
			const next = jest.fn();
          
			entityValidator.singleEntityValidator(request, response, next);
          
			expect(next).toHaveBeenCalled();
		});

	});


	describe('entitiesBySingleUserValidator', () => {

		it('should return 400 status code when userId is not a string', async () => {
			const request = {
				params: {
					userId: 42,
					type: 'test',
				},
			};
			const response = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
			};

			entityValidator.entitiesBySingleUserValidator(request, response);

			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.status().json).toHaveBeenCalledWith({ message: '"userId" must be a string' });

		});

		it('should return 400 status code when type is not a string', async () => {
			const request = {
				params: {
					userId: 'test',
					type: 42,
				},
			};
			const response = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
			};

			entityValidator.entitiesBySingleUserValidator(request, response);

			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.status().json).toHaveBeenCalledWith({ message: '"type" must be a string' });

		});

		it('should call next function when userId and type are valid', async () => {
			const request = {
				params: {
					userId: 'test',
					type: 'POST',
				},
			};
			const response = {};
			const next = jest.fn();

			entityValidator.entitiesBySingleUserValidator(request, response, next);

			expect(next).toHaveBeenCalled();
		});

	});

});