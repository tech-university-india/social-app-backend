const { Entity, Tag, Action } = require('../../src/models');
const entityService = require('../../src/services/entity.service');

describe('Entity Service', () => {


	describe('Create Entity', () => {
		it('should return 201 CREATED', async () => {
			const mockBody = {
				type: 'announcement',
				caption: 'This is an announcement',
				imageURL: 'https://example.com/image1.jpg',
				meta: {
					date: '2023-02-08',
					venue: 'Online'
				},
				location: 'Online',
				createdBy: 'John Doe',
				tags: []
			};

			jest.spyOn(Entity, 'create').mockResolvedValue(mockBody);
			jest.spyOn(Tag, 'bulkCreate').mockResolvedValue([]);
			expect(await entityService.createEntity(mockBody, 1)).toEqual({ entity: mockBody, tags: [] });
		});
		it('should throw error', async () => {
			const mockBody = {
				"type": "POST",
				"caption": "New Post 3",
				"imageURL": ["http://example.ima/image"],
				"tags": [
					{ "id": 1 },
					{ "id": 3 },
					{ "id": 2 }
				]
			}
			jest.spyOn(Entity, 'create').mockRejectedValue(new Error());
			await expect(entityService.createEntity(mockBody, 1)).rejects.toThrow(new Error());
		});
	});
	describe('getSingleEntityData', () => {
		it('should return entity data for a POST with likes and comments count', async () => {
			const mockFindOne = 1;
			const mockEntity = {
				id: 1,
				createdBy: 1,
				type: 'POST',
				caption: 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				User: {
					userName: 'testUser',
					designation: 'testDesignation',
					profilePictureURL: 'https://www.google.com'
				},
				Actions: [
					{
						LikesCount: 1,
						CommentsCount: 1,
						meta: {
							commentText: 'This is a test comment'
						}
					}
				]
			};
			jest.spyOn(Entity, 'findOne').mockResolvedValue(mockEntity);
			const entity = await entityService.getSingleEntityData(mockFindOne);
			expect(entity).toEqual(mockEntity);
		});
		it('should return entity data for a ANNOUNCEMENT with likes and comments count', async () => {

			const mockFindOne = 1;
			const mockEntity = {
				id: 1,
				createdBy: 1,
				type: 'POST',
				caption: 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				User: {
					userName: 'testUser',
					designation: 'testDesignation',
					profilePictureURL: 'https://www.google.com'
				},
				Actions: [
					{
						LikesCount: 1,
						CommentsCount: 0,
						meta: null
					}
				],
				meta: {
					date: '2020-10-10',
					venue: 'Bangalore'
				}
			};
			jest.spyOn(Entity, 'findOne').mockResolvedValue(mockEntity);
			const entity = await entityService.getSingleEntityData(mockFindOne);

			expect(entity).toEqual(mockEntity);
		});
		it('should throw error if entity not found', async () => {
			const mockFindOne = 1;
			const mockEntity = null;
			jest.spyOn(Entity, 'findOne').mockResolvedValue(mockEntity);
			await expect(entityService.getSingleEntityData(mockFindOne, 1)).rejects.toThrow('Entity not found');
		});
	});
	describe('getCommentsByEntityId', () => {
		it('should return an array of comments for a post', async () => {
			const mockEntity = [
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
			const mockFindOne = 1;
			jest.spyOn(Action, 'findAll').mockResolvedValue(mockEntity);
			const entity = await entityService.getCommentsByEntityId(mockFindOne);
			expect(entity).toEqual(mockEntity);
		});
		it('should throw error if entity not found', async () => {
			jest.spyOn(Action, 'findAll').mockRejectedValue(new Error());
			await expect(entityService.getCommentsByEntityId(1)).rejects.toThrow(new Error());
		});
	});
	describe('getEntitiesBySingleUser', () => {
		it('should return an array of entities data for a user', async () => {
			const mockEntity = [{
				id: 1,
				createdBy: 1,
				type: 'POST',
				caption: 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				Actions: [
					{
						LikesCount: 1,
						CommentsCount: 1,
						meta: {
							commentText: 'This is a test comment'
						}
					}
				]
			}, {
				id: 1,
				createdBy: 1,
				type: 'POST',
				caption: 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				Actions: [
					{
						LikesCount: 1,
						CommentsCount: 1,
						meta: {
							commentText: 'This is a test comment'
						}
					}
				]
			}];

			jest.spyOn(Entity, 'findAll').mockResolvedValue([mockEntity]);
			const entity = await entityService.getEntitiesBySingleUser(1, 'POST', 1);
			expect(entity).toEqual([mockEntity]);
		});
	});
	describe('getPostFeed', () => {
		it('should return an array of posts for a user without pageDate', async () => {
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
			jest.spyOn(Entity, 'findAll').mockResolvedValue([postFeed]);
			const entity = await entityService.getPostFeed(1);
			expect(entity).toEqual([postFeed]);
		});
		it('should return an array of posts for a user with pageDate', async () => {
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
			jest.spyOn(Entity, 'findAll').mockResolvedValue([postFeed]);
			const entity = await entityService.getPostFeed(1, 1);
			expect(entity).toEqual([postFeed]);
		});
		it('should throw error if db Fails', async () => {
			jest.spyOn(Entity, 'findAll').mockRejectedValue(new Error());
			await expect(entityService.getPostFeed(1, 1)).rejects.toThrow(new Error());
		});
	});
	describe('getAnnouncementFeed', () => {
		it('should return an array of announcements for a user', async () => {
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
			jest.spyOn(Entity, 'findAll').mockResolvedValue([announcementFeed]);
			const entity = await entityService.getAnnouncementFeed(1, 1);
			expect(entity).toEqual([announcementFeed]);
		});
		it('should throw error if db Fails', async () => {
			jest.spyOn(Entity, 'findAll').mockRejectedValue(new Error());
			await expect(entityService.getAnnouncementFeed(1, 1)).rejects.toThrow(new Error());
		});
	});
	describe('updateEntity', () => {
		it('should update entity caption', async () => {
			const entityID = {
				entityId: 1
			};
			const body = {
				id: 1,
				caption: 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				meta: {
					date: '2020-10-10',
					venue: 'Bangalore'
				},
				tags: []
			};
			const updateResponseFromDB = [1, {}];
			jest.spyOn(Entity, 'update').mockResolvedValue(updateResponseFromDB);
			jest.spyOn(Tag, 'bulkCreate').mockResolvedValue([{ id: 1 }, { id: 2 }]);
			jest.spyOn(Tag, 'destroy').mockResolvedValue(1)
			const update = await entityService.updateEntityService(body, entityID);
			expect(update).toEqual({ entity: updateResponseFromDB[1], tags: [{ id: 1 }, { id: 2 }] });
		});
		it('should throw error if entity not found', async () => {
			const entityID = 1;
			const body = {
				id: 1,
				caption: 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				meta: {
					date: '2020-10-10',
					venue: 'Bangalore'
				}
			};
			jest.spyOn(Entity, 'update').mockResolvedValue([0]);
			await expect(entityService.updateEntityService(body, entityID)).rejects.toThrow('Entity not found');
		});
	});
	describe('deleteSingleEntity', () => {
		it('should return true and delete entity', async () => {
			const mockEntity = [1];
			jest.spyOn(Entity, 'destroy').mockResolvedValue(mockEntity);
			const entity = await entityService.deleteSingleEntity(1);
			expect(entity).toEqual(true);
		});
		it('should throw error if entity not found', async () => {
			jest.spyOn(Entity, 'destroy').mockResolvedValue(0);
			await expect(entityService.deleteSingleEntity(1, 1)).rejects.toThrow('Entity not found');
		});
	});
});