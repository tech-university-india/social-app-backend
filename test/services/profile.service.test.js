const profileService = require('../../src/services/profile.service');
const { User,Follow } = require('../../src/models');
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
			const mockFollowerData = [{
				dataValues:{
					id: 1,
					followerId: 2,
					followingId: 1,
					createdAt: '2023-02-08T16:51:21.534Z'
				}
			}];
			const mockFollowingData = [{
				dataValues:{
					id: 5,
					followerId: 1,
					followingId: 2,
					createdAt: '2023-02-08T16:51:21.534Z'
				}
			}]; 

			const mockUserData = [{dataValues:{
				'FMNO': 2,
				'email': 'exampleuser3@example.com',
				'passwordHash': 'pass@123',
				'bio': 'backend developer and photography hobbyist',
				'userName': 'Jane Doe',
				'designation': 'Manager',
				'profilePictureURL': 'https://example.com/image2.jpg',
				'createdAt': '2023-02-08T16:51:21.508Z',
				'updatedAt': '2023-02-08T16:51:21.508Z'
			}}];

			const mockUserIdData = [{dataValues:{
				'FMNO': 1,
				'email': 'exampleuser1@example.com',
				'bio': 'Backend and fishing expert',
				'userName': 'John Doe',
				'designation': 'Partner',
				'profilePictureURL': 'https://example.com/image1.jpg',
				'createdAt': '2023-02-08T17:56:02.800Z',
				'updatedAt': '2023-02-08T17:56:02.800Z'
			}}];

			const mockResult = [
				{
					'FMNO': 2,
					'email': 'exampleuser3@example.com',
					'designation': 'Manager',
					'isFollowed': false,
					'profilePictureURL': 'https://example.com/image2.jpg'
				},
			];
            
			jest.spyOn(User, 'findAll').mockResolvedValue(mockUserData);
			jest.spyOn(User, 'findOne').mockResolvedValue(mockUserIdData);
			jest.spyOn(Follow, 'findAll').mockResolvedValue(mockFollowerData);
			jest.spyOn(Follow, 'findAll').mockResolvedValue(mockFollowingData);
			expect(await profileService.getFollowersById(1)).toEqual(mockResult);
		});
		it('should return status code 404 when user doesnt not exist',async()=>{
			jest.spyOn(User, 'findOne').mockResolvedValue(null);
			expect(async()=>await profileService.getFollowersById(300)).rejects.toThrow(new HTTPError('404','User not found'));
		});
	});
});
