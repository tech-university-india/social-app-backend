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


	describe('updateValidatior', () => {
		it('should return 400 status code when name is not a string',  () => {
			const request = {
				params: {
					entityId: 'not-a-number',
				},
				body: {
					caption : 'Update is a test caption',
					imageURL: ['https://www.google.com'],
					location: ['Bangalore'],
					meta: {
						date: '2020-10-10',
						'venue': 'Bangalore'
					}
				},
			};
			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			const next = jest.fn();
			entityValidator.updateValidatior(request, response,next);
			expect(response.status).toBeCalledWith(400);
			expect(response.json).toHaveBeenCalledWith({ message: '"entityId" must be a number' });
	
		});
		it('should return 400 status code when name is not a string',  () => {
			const request = {
				params: {
					entityId: 1,
				},
				body: {
					
					caption : 'Update is a test caption',
					imageURL: 'https://www.google.com',
					location: ['Bangalore'],
					meta: {
						date: '2020-10-10',
						'venue': 'Bangalore'
					}
					
				},
			};
			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			const next = jest.fn();

			entityValidator.updateValidatior(request, response,next);
	
			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.json).toHaveBeenCalledWith({ message: '"imageURL" must be an array' });
	
		});
		it('should return 400 status code when name is not a string',  () => {
			const request = {
				params: {
					entityId: 1,
				},
				body: {
					
					caption : 1,
					imageURL: ['https://www.google.com'],
					location: ['Bangalore'],
					meta: {
						date: '2020-10-10',
						'venue': 'Bangalore'
					}
					
				},
			};
			const response = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			const next = jest.fn();

			entityValidator.updateValidatior(request, response,next);
	
			expect(response.status).toHaveBeenCalledWith(400);
			expect(response.json).toHaveBeenCalledWith({ message: '"caption" must be a string' });
	
		});
		it('should return to router when all data is given correctly',  () => {
			const request = {
				params: {
					entityId: 1,
				},
				body: {
					
					caption : 'Update is a test caption',
					imageURL: ['https://www.google.com'],
					location: ['Bangalore'],
					meta: {
						date: '2020-10-10',
						'venue': 'Bangalore'
					}
					
				},
			};
			const response = {};
			const next = jest.fn();

			entityValidator.updateValidatior(request, response,next);

			expect(next).toHaveBeenCalled();
	
		});
	});


	describe('Create Entity Validator', () => {
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

			entityValidator.createEntityValidator(mockReq, mockRes, mockNext);
			expect(mockNext).toBeCalled();
		});
 
		it('should throw an error', () => {
			const mockReq = {
				body: jest.fn()
			};
 
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};

			const mockNext = jest.fn();
 
			entityValidator.createEntityValidator(mockReq, mockRes, mockNext);
			expect(mockRes.status).toBeCalledWith(400);
		});
	});

});