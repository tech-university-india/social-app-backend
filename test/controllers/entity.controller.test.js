const entities = require('../../src/services/entity.service');
const entityControllers = require('../../src/controllers/entity.controller');
const customHTTPError = require('../../src/errors/httperror');

describe('Entity Controller', () => {
	describe('singleEntityRetiver', () => {

		it('should return 200 status code with entity data when entity is present ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'getSingleEntityData').mockResolvedValue({
				id: 1, name: 'test', type: 'test', userId: 1
			});
			await entityControllers.singleEntityRetiver(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity data fetched successfully',
				entityData: {
					id: 1, name: 'test', type: 'test', userId: 1
				}
			});
		});

		it('should return 404 status code when entity is not present ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'getSingleEntityData').mockRejectedValue(new customHTTPError(404, 'Entity not found'));
			await entityControllers.singleEntityRetiver(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity not found'
			});

		});

		it('should return 500 status code when any other error is thrown ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'getSingleEntityData').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.singleEntityRetiver(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Internal Server Error'
			});

		});
	});


	describe('entitiesBySingleUserRetiver', () => {

		it('should return 200 status code with array of entity data when entities for userId is present ', async () => {

			const mockReq = {
				params: {
					userId: 1,
					type: 'test'
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'getEntitiesBySingleUser').mockResolvedValue([{
				id: 1, name: 'test', type: 'test', userId: 1
			}]);
			await entityControllers.entitiesBySingleUserRetiver(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity data fetched successfully',
				entityData: [{
					id: 1, name: 'test', type: 'test', userId: 1
				}]
			});

		});

		it('should return 404 status code when entities for userId is not present ', async () => {

			const mockReq = {
				params: {
					userId: 1,
					type: 'test'
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'getEntitiesBySingleUser').mockRejectedValue(new customHTTPError(404, 'Entity not found'));
			await entityControllers.entitiesBySingleUserRetiver(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity not found'
			});

		});

		it('should return 500 status code when any other error is thrown ', async () => {

			const mockReq = {
				params: {
					userId: 1,
					type: 'test'
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'getEntitiesBySingleUser').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.entitiesBySingleUserRetiver(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Internal Server Error'
			});

		});
		describe('updateEntity', () => {
			it('should return 200 status code with updated entity data when entity is updated successfully', async () => {

				const mockReq = {
					params: {
						entityId: 1
					},
					body: {
						'caption': 'test',
						imgaeUrl: 'test',
						'location': 'test',
						'meta': {
							'date': 'test',
							'venue': 'test',
						}

					}
				};
				const mockRes = {
					status: jest.fn().mockReturnThis(),
					json: jest.fn()
				};
				jest.spyOn(entities, 'updateEntityService').mockResolvedValue([1]);
				await entityControllers.updateEntity(mockReq, mockRes);
				expect(mockRes.status).toHaveBeenCalledWith(201);
				expect(mockRes.json).toHaveBeenCalledWith({
					message: 'Number of Rows update',
					entityDataUpdate: 1
				});

			}
			);

			it('should return 500 status code when entity is not present ', async () => {

				const mockReq = {
					params: {
						userId: 1,
						type: 'test'
					},
					body: {
						'caption': 'test',
						imgaeUrl: 'test',
						'location': 'test',
						'meta': {
							'date': 'test',
							'venue': 'test',
						}
					}
				};
				const mockRes = {
					status: jest.fn().mockReturnThis(),
					json: jest.fn()
				};
				jest.spyOn(entities, 'updateEntityService').mockRejectedValue(new Error('Internal Server Error'));
				await entityControllers.updateEntity(mockReq, mockRes);
				expect(mockRes.status).toHaveBeenCalledWith(500);
				expect(mockRes.json).toHaveBeenCalledWith({
					message: 'Internal Server Error'
				});
			});
			it('should return the HTTP error status code and message if the error is an HTTPError', async () => {
				const error = new customHTTPError(400, 'Bad Request');
				jest.spyOn(entities, 'updateEntityService').mockRejectedValue(error);
				const request = {
					body: { /* some test data */ },
					params: { entityId: '123' }
				};
				const response = {
					status: jest.fn().mockReturnThis(),
					json: jest.fn()

				};
				await entityControllers.updateEntity(request, response);

				expect(response.status).toHaveBeenCalledWith(400);
				expect(response.json).toHaveBeenCalledWith({
					message: 'Bad Request'
				});
			});
		});
	});

	describe('singleEntityDeleter', () => {

		it('should return 200 status code with entity data deleted ', async () => {

			const mockReq = {
				params: {
					entityId: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'deleteSingleEntity').mockResolvedValue(null);
			await entityControllers.singleEntityDeleter(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity data deleted successfully'
			});
		});

		it('should return 404 status code when entity is not present ', async () => {

			const mockReq = {
				params: {
					entityId: 1
				}
			};

			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entities, 'deleteSingleEntity').mockRejectedValue(new customHTTPError(404, 'Entity not found'));
			await entityControllers.singleEntityDeleter(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity not found'
			});

		});

		it('should return 500 status code when any other error is thrown ', async () => {

			const mockReq = {
				params: {
					entityId: 1
				}
			};

			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};

			jest.spyOn(entities, 'deleteSingleEntity').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.singleEntityDeleter(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Internal Server Error'
			});

		});

	});
});