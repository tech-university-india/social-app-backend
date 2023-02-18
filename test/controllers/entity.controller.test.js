const entityService = require('../../src/services/entity.service');
const entityControllers = require('../../src/controllers/entity.controller');
const HTTPError = require('../../src/errors/httperror');
const { entityTypes } = require('../../src/utils/constants');

describe('Entity Controller', () => {
	describe('getSingleEntityData', () => {
		it('should return 200 status code with entity data when entity is present ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				},
				user: {
					id: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getSingleEntityData').mockResolvedValue({
				id: 1, name: 'test', type: 'test', userId: 1
			});
			await entityControllers.getSingleEntityData(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith({
				id: 1, name: 'test', type: 'test', userId: 1
			});
		});

		it('should return 404 status code when entity is not present ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				},
				user: {
					id: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getSingleEntityData').mockRejectedValue(new HTTPError(404, 'Entity not found'));
			await entityControllers.getSingleEntityData(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity not found'
			});

		});

		it('should return 500 status code when any other error is thrown ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				},
				user: {
					id: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getSingleEntityData').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.getSingleEntityData(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
		});
	});
	describe('getCommentsByEntityId', () => {
		it('should return 200 status code with array of comments when comments for entityId is present ', async () => {
			const mockReq = {
				params: { entityId: 1 },
				user: { id: 1 },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			const comments = [
				{
					"meta": {
						"commentText": "comment4"
					},
					"User": {
						"FMNO": 3,
						"userName": "Jim Smith",
						"designation": "Team Lead",
						"profilePictureURL": "https://example.com/image3.jpg"
					}
				},
				{
					"meta": {
						"commentText": "comment4"
					},
					"User": {
						"FMNO": 3,
						"userName": "Jim Smith",
						"designation": "Team Lead",
						"profilePictureURL": "https://example.com/image3.jpg"
					}
				},
				{
					"meta": {
						"commentText": "comment4"
					},
					"User": {
						"FMNO": 4,
						"userName": "Sarah Johnson",
						"designation": "Analyst",
						"profilePictureURL": "https://example.com/image4.jpg"
					}
				}
			]
			jest.spyOn(entityService, 'getCommentsByEntityId').mockResolvedValue(comments);
			await entityControllers.getCommentsByEntityId(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(comments);
		});
		it('should return HTTPError', async () => {
			const mockReq = {
				params: { entityId: 1 },
				user: { id: 1 },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getCommentsByEntityId').mockRejectedValue(new HTTPError(404, 'Comments not found'));
			await entityControllers.getCommentsByEntityId(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({ message: 'Comments not found' });
		});
		it('should return 500 status code when any other error is thrown ', async () => {
			const mockReq = {
				params: { entityId: 1 },
				user: { id: 1 },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getCommentsByEntityId').mockRejectedValue(new Error("Internal Server Error"));
			await entityControllers.getCommentsByEntityId(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
		});
	});
	describe('getEntitiesBySingleUser', () => {
		it('should return 200 status code with array of entity data when entities for userId is present ', async () => {
			const mockReq = {
				params: { userId: 1, type: 'test' },
				user: { id: 1 },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getEntitiesBySingleUser').mockResolvedValue([{
				id: 1, name: 'test', type: 'test', userId: 1
			}]);
			await entityControllers.getEntitiesBySingleUser(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith([{
				id: 1, name: 'test', type: 'test', userId: 1
			}]);
		});
		it('should return 404 status code when entities for userId is not present ', async () => {
			const mockReq = {
				params: { userId: 1, type: 'test' },
				user: { id: 1 },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getEntitiesBySingleUser').mockRejectedValue(new HTTPError(404, 'Entity not found'));
			await entityControllers.getEntitiesBySingleUser(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity not found'
			});
		});
		it('should return 500 status code when any other error is thrown ', async () => {
			const mockReq = {
				params: { userId: 1, type: 'test' },
				user: { id: 1 },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getEntitiesBySingleUser').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.getEntitiesBySingleUser(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Internal Server Error'
			});
		});
	});
	describe('getFeed', () => {
		it('should return 200 status code with array of Post data ', async () => {
			const mockReq = {
				user: { id: 1 },
				params: { type: entityTypes.POST },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			const postFeed = [
				{
					"id": 20,
					"type": "POST",
					"caption": "20th Entity",
					"imageURL": [
						"https://example.com/image26.jpg",
						"https://example.com/image27.jpg"
					],
					"meta": null,
					"location": [
						"Bangalore"
					],
					"likeCount": 1,
					"commentCount": 0,
					"isLiked": null,
					"User": {
						"FMNO": 2,
						"userName": "Jane Doe",
						"designation": "Manager",
						"profilePictureURL": "https://example.com/image2.jpg"
					}
				}
			]
			jest.spyOn(entityService, 'getPostFeed').mockResolvedValue(postFeed);
			await entityControllers.getFeed(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(postFeed);
		});
		it('should return 200 status code with array of Announcement data ', async () => {
			const mockReq = {
				user: { id: 1 },
				params: { type: entityTypes.ANNOUNCEMENT },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			const announcementFeed = [
				{
					"id": 19,
					"type": "ANNOUNCEMENT",
					"caption": "19th Entity",
					"imageURL": [
						"https://example.com/image24.jpg",
						"https://example.com/image25.jpg"
					],
					"meta": {
						"date": "2023-02-07T16:10:26.603Z",
						"venue": "Gurgoan"
					},
					"location": [
						"Gurgoan"
					],
					"likeCount": 0,
					"commentCount": 1,
					"isLiked": null,
					"User": {
						"FMNO": 5,
						"userName": "Tom Brown",
						"designation": "Consultant",
						"profilePictureURL": "https://example.com/image5.jpg"
					}
				}			
			]
			jest.spyOn(entityService, 'getAnnouncementFeed').mockResolvedValue(announcementFeed);
			await entityControllers.getFeed(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(200);
			expect(mockRes.json).toHaveBeenCalledWith(announcementFeed);
		});
		it('should throw HTTPError ', async () => {
			const mockReq = {
				user: { id: 1 },
				params: { type: entityTypes.POST },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getPostFeed').mockRejectedValue(new HTTPError(400, 'HTTPError'));
			await entityControllers.getFeed(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(400);
			expect(mockRes.json).toHaveBeenCalledWith({ message: 'HTTPError' });
		});
		it('should return 500 status code when any other error is thrown ', async () => {
			const mockReq = {
				user: { id: 1 },
				params: { type: entityTypes.POST },
				query: {}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(entityService, 'getPostFeed').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.getFeed(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
		});
	});
	describe('updateEntity', () => {
		it('should return 200 status code with updated entity data when entity is updated successfully', async () => {
			const mockReq = {
				params: { entityId: 1 },
				user: { id: 1 },
				query: {},
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
			const resolvedUpdate = [{
				id: 1,
				caption: 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				meta: {
					date: '2020-10-10',
					venue: 'Bangalore'
				}
			}];
			jest.spyOn(entityService, 'updateEntityService').mockResolvedValue(resolvedUpdate);
			await entityControllers.updateEntity(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(201);
			expect(mockRes.json).toHaveBeenCalledWith(resolvedUpdate);
		});
		it('should return 500 status code when DB error', async () => {
			const mockReq = {
				params: { userId: 1, type: 'test' },
				user: { id: 1 },
				query: {},
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
			jest.spyOn(entityService, 'updateEntityService').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.updateEntity(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Internal Server Error'
			});
		});
		it('should return the HTTP error status code and message if the error is an HTTPError', async () => {
			const error = new HTTPError(400, 'Bad Request');
			jest.spyOn(entityService, 'updateEntityService').mockRejectedValue(error);
			const request = {
				body: { /* some test data */ },
				params: { entityId: '123' },
				user: { id: 1 },
				query: {}
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
	describe('deleteSingleEntity', () => {
		it('should return 200 status code with entity data deleted ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				},
				user: {
					id: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				sendStatus: jest.fn()
			};
			jest.spyOn(entityService, 'deleteSingleEntity').mockResolvedValue(null);
			await entityControllers.deleteSingleEntity(mockReq, mockRes);
			expect(mockRes.sendStatus).toHaveBeenCalledWith(204);
		});
		it('should return 404 status code when entity is not present ', async () => {

			const mockReq = {
				params: {
					entityId: 1
				},
				user: {
					id: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				sendStatus: jest.fn()
			};
			jest.spyOn(entityService, 'deleteSingleEntity').mockRejectedValue(new HTTPError(404, 'Entity not found'));
			await entityControllers.deleteSingleEntity(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(404);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Entity not found'
			});
		});
		it('should return 500 status code when any other error is thrown ', async () => {
			const mockReq = {
				params: {
					entityId: 1
				},
				user: {
					id: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				sendStatus: jest.fn()
			};
			jest.spyOn(entityService, 'deleteSingleEntity').mockRejectedValue(new Error('Internal Server Error'));
			await entityControllers.deleteSingleEntity(mockReq, mockRes);
			expect(mockRes.status).toHaveBeenCalledWith(500);
			expect(mockRes.json).toHaveBeenCalledWith({
				message: 'Internal Server Error'
			});
		});
	});
	describe('create entity', () => {
		it('should return 201 created', async () => {
			const serviceResponse = {
				type: 'POST',
				caption: 'lorem ipsum',
				imageURL: ['abc.jpg'],
				meta: {
					date: '10 Feb 2023',
					venue: 'Brigade'
				},
				location: ['Mumbai', 'Bangalore'],
				createdBy: 1
			}
			jest.spyOn(entityService, 'createEntity').mockResolvedValue(serviceResponse);
			const mockReq = {
				body: {
					type: 'POST',
					caption: 'lorem ipsum',
					imageURL: ['abc.jpg'],
					meta: {
						date: '10 Feb 2023',
						venue: 'Brigade'
					},
					location: ['Mumbai', 'Bangalore']
				},
				user: {
					id: 1
				}
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			await entityControllers.createEntity(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(201);
			expect(mockRes.json).toBeCalledWith(serviceResponse);
		});
		it('should throw 500', async () => {
			jest.spyOn(entityService, 'createEntity').mockRejectedValue(new Error('Internal Server Error'));
			const mockReq = {
				body: jest.fn(),
				user: {
					id: 1
				}
			};

			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};

			await entityControllers.createEntity(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(500);
		});
		it('should throw 400', async () => {
			jest.spyOn(entityService, 'createEntity').mockRejectedValue(new HTTPError(400, 'Error while creating post'));
			const mockReq = {
				body: jest.fn(),
				user: { id: 1 }
			};
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			await entityControllers.createEntity(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(400);
			expect(mockRes.json).toBeCalledWith({ message: 'Error while creating post' });
		});
	});
});