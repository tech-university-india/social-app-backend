const { Entity } = require('../../src/models');
const entityService = require('../../src/services/entity.services');

describe('Entity Service', () => {

	describe('getSingleEntityData', () => {
		it('should return entity data for a POST with likes and comments count', async () => {

			const mockFindOne = 1;
			const mockEntity = {
				id: 1,
				createdBy: 1,
				type: 'POST',
				caption : 'This is a test caption',
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
							commentText:  'This is a test comment'
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
				caption : 'This is a test caption',
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
				meta:{
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

			await expect(entityService.getSingleEntityData(mockFindOne)).rejects.toThrow('Entity not found');
		});
	});


	describe('getEntitiesBySingleUser', () => {
		it('should return an array of entities data for a user', async () => {

			
			const mockEntity = [{
				id: 1,
				createdBy: 1,
				type: 'POST',
				caption : 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				Actions: [
					{
						LikesCount: 1,
						CommentsCount: 1,
						meta: {
							commentText:  'This is a test comment'
						}
					}
				]
			},
			{
				id: 1,
				createdBy: 1,
				type: 'POST',
				caption : 'This is a test caption',
				imageURL: ['https://www.google.com',],
				location: ['Bangalore',],
				Actions: [
					{
						LikesCount: 1,
						CommentsCount: 1,
						meta: {
							commentText:  'This is a test comment'
						}
					}
				]
			}];

			jest.spyOn(Entity, 'findAll').mockResolvedValue([mockEntity]);
			const entity = await entityService.getEntitiesBySingleUser(1,'POST');

			expect(entity).toEqual([mockEntity]);

		});

		it('should throw error if entity not found', async () => {

			const mockEntity = null;
			jest.spyOn(Entity, 'findAll').mockResolvedValue(mockEntity);

			await expect(entityService.getEntitiesBySingleUser(1,'POST')).rejects.toThrow('No entities found');

		});

	});
	describe('updateEntity', () => {
		describe('Verfiy when porper input given ', () => {
			it('should update entity caption', async () => {
				const entityID = {
					entityId: 1
				};
					
				const body =  {
					id: 1,
					caption: 'This is a test caption',
					imageURL: ['https://www.google.com',],
					location: ['Bangalore',],
					meta: {
						date: '2020-10-10',
						venue: 'Bangalore'
					}
					
				};
				const updateResponseFromDB = [1];
				jest.spyOn(Entity, 'update').mockResolvedValue(updateResponseFromDB);
				const update = await entityService.updateEntityService(body,entityID);
				expect(update).toEqual(updateResponseFromDB);
			});
		});
		describe('Verfiy when improper input given ', () => {
			it('should throw error if entity not found', async () => {
				const entityID = 1;
					
				const body =  {
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


				await expect(entityService.updateEntityService(body,entityID)).rejects.toThrow('Entity not found');
			});
			
		});
	});
});

