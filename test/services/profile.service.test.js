const profileService = require('../../src/services/profile.service');
const { User} = require('../../src/models');
const HTTPError = require('../../src/errors/httperror');

describe('Profile Service', () => {
	describe('Get Profile By Id', () => {
		it('should return 200 with profile', async () => {
			const user = {
				'FMNO': 1,
				'email': 'exampleuser1@example.com',
				'bio': 'Backend and fishing expert',
				'userName': 'John Doe',
				'designation': 'Partner',
				'profilePictureURL': 'https://example.com/image1.jpg',
				'createdAt': '2023-02-08T17:56:02.800Z',
				'updatedAt': '2023-02-08T17:56:02.800Z'
			};
			jest.spyOn(User, 'findByPk').mockResolvedValue(user);
			expect(await profileService.getUserById(1)).toEqual(user);
		});
		it('should return 404 if user not found', async () => {
			jest.spyOn(User, 'findByPk').mockResolvedValue(null);
			expect(async () => await profileService.getUserById(1)).rejects.toThrow(new HTTPError(404, 'User not found'));
		});
		it('should return 404 if user not found', async () => {
			jest.spyOn(User, 'findByPk').mockRejectedValue(new Error());
			expect(async () => await profileService.getUserById(1)).rejects.toThrow(new Error());
		});
	});
	describe('Get Followers By Id', () => {
		it('should return 200 with followers list', async () => {
		

			const mockFindAll = {

				'FMNO': 2,
				'email': 'exampleuser3@example.com',
				'passwordHash': 'pass@123',
				'bio': 'backend developer and photography hobbyist',
				'userName': 'Jane Doe',
				'designation': 'Manager',
				'profilePictureURL': 'https://example.com/image2.jpg',
				'createdAt': '2023-02-08T16:51:21.508Z',
				'updatedAt': '2023-02-08T16:51:21.508Z',
				'Following': [{
					dataValues:{
						'FMNO': 1,
						'designation': 'Partner',
						'userName': 'John Doe',
						'profilePictureURL': 'https://example.com/image1.jpg',
						'Following': [{dataValues:
							{
								'FMNO': 2,
								'designation': 'Manager',
								'userName': 'Jane Doe',
								'profilePictureURL': 'https://example.com/image2.jpg'
							},
						}
						]
					}
				
				},
				]
			};

			// const mockResult = [
			// 	{
			// 		'FMNO': 1,
			// 		'designation': 'Partner',
			// 		'userName': 'John Doe',
			// 		'isFollowed': true,
			// 		'profilePictureURL': 'https://example.com/image1.jpg',
			// 	}
			// ];
            
			jest.spyOn(User, 'findByPk').mockResolvedValue(mockFindAll);
			expect(await profileService.getFollowersById(2)).toEqual(mockFindAll);
			
		});
		it('should return status code 404 when user doesnt not exist',async()=>{
			jest.spyOn(User, 'findByPk').mockResolvedValue(null);
			expect(async()=>await profileService.getFollowersById(1)).rejects.toThrow(new HTTPError(404,'User not found'));
		});
	});
	describe('Get Following By Id', () => {
		it('should return 200 with following list', async () => {
		

			const mockFindAll = {

				'FMNO': 2,
				'email': 'exampleuser3@example.com',
				'passwordHash': 'pass@123',
				'bio': 'backend developer and photography hobbyist',
				'userName': 'Jane Doe',
				'designation': 'Manager',
				'profilePictureURL': 'https://example.com/image2.jpg',
				'createdAt': '2023-02-08T16:51:21.508Z',
				'updatedAt': '2023-02-08T16:51:21.508Z',
				'Followers': [{
					dataValues:{
						'FMNO': 1,
						'designation': 'Partner',
						'userName': 'John Doe',
						'profilePictureURL': 'https://example.com/image1.jpg',
						'Followers': [{dataValues:
							{
								'FMNO': 2,
								'designation': 'Manager',
								'userName': 'Jane Doe',
								'profilePictureURL': 'https://example.com/image2.jpg'
							},
						}
						]
					}
				
				},
				]
			};

			// const mockResult = [
			// 	{
			// 		'FMNO': 1,
			// 		'designation': 'Partner',
			// 		'userName': 'John Doe',
			// 		'isFollowing': true,
			// 		'profilePictureURL': 'https://example.com/image1.jpg',
			// 	}
			// ];
            
			jest.spyOn(User, 'findByPk').mockResolvedValue(mockFindAll);
			expect(await profileService.getFollowingById(2)).toEqual(mockFindAll);
			
		});
		it('should return status code 404 when user doesnt not exist',async()=>{
			jest.spyOn(User, 'findByPk').mockResolvedValue(null);
			expect(async()=>await profileService.getFollowingById(1)).rejects.toThrow(new HTTPError(404,'User not found'));
		});
	});
});

