const entities = require('../../src/services/entity.services');
const entityControllers = require('../../src/controllers/entity.controllers');
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