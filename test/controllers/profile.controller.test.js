const HTTPError = require('../../src/errors/httperror');
const profileController = require('../../src/controllers/profile.controller');
const profileService = require('../../src/services/profile.service');

describe('Profile Controller', () => {
	describe('GET /profile/{userId}', () => {
		it('should return 200 OK', async () => {
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
			jest.spyOn(profileService, 'getUserById').mockResolvedValue(user);
			const mockReq = { params: { userId: 1 }, user: { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnValue({ json: jest.fn() })
			};
			await profileController.getUserById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(200);
			expect(mockRes.status().json).toBeCalledWith(user);
		});
		it('should throw 404 User not found', async () => {
			jest.spyOn(profileService, 'getUserById').mockRejectedValue(new HTTPError(404, 'User not found'));
			const mockReq = { params: { userId: 1 }, user: { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnValue({ json: jest.fn() })
			};
			await profileController.getUserById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(404);
			expect(mockRes.status().json).toBeCalledWith({ message: 'User not found' });
		});
		it('should throw 500', async () => {
			jest.spyOn(profileService, 'getUserById').mockRejectedValue(new Error());
			const mockReq = { params: { userId: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnValue({ json: jest.fn() })
			};
			await profileController.getUserById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(500);
		});
	});
	describe('GET /profile/{userId}/followers', () => {
		it('should return 200 OK', async () => {
			const followers = [
				{
					'FMNO': 2,
					'email': 'exampleuser3@example.com',
					'designation': 'Manager',
					'isFollowed': false,
					'profilePictureURL': 'https://example.com/image2.jpg'
				},
				{
					'FMNO': 3,
					'email': 'exampleuser4@example.com',
					'designation': 'Team Lead',
					'isFollowed': false,
					'profilePictureURL': 'https://example.com/image3.jpg'
				}
			];
			const mockReq = { 'params': { 'userId': 1 }, 'user': { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'getFollowersById').mockResolvedValue(followers);
			await profileController.getFollowersById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(200);
			expect(mockRes.json).toBeCalledWith(followers);
		});
		it('should throw 404 Followers not found', async () => {
			const mockReq = { 'params': { 'userId': 1 }, 'user': { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'getFollowersById')
				.mockRejectedValue(new HTTPError(404, 'Followers not found'));
			await profileController.getFollowersById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(404);
			expect(mockRes.status().json).toBeCalledWith({ message: 'Followers not found' });
		});
		it('should throw 500 error', async () => {
			const mockReq = { 'params': { 'userId': 1 }, 'user': { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'getFollowersById').mockRejectedValue(new Error());
			await profileController.getFollowersById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(500);
		});
	});
	describe('GET /profile/{userId}/following', () => {
		it('should return 200 OK', async () => {
			const followers = [
				{
					'FMNO': 2,
					'email': 'exampleuser3@example.com',
					'designation': 'Manager',
					'isFollowing': false,
					'profilePictureURL': 'https://example.com/image2.jpg'
				},
				{
					'FMNO': 3,
					'email': 'exampleuser4@example.com',
					'designation': 'Team Lead',
					'isFollowing': false,
					'profilePictureURL': 'https://example.com/image3.jpg'
				}
			];
			const mockReq = { 'params': { 'userId': 1 }, 'user': { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'getFollowingById').mockResolvedValue(followers);
			await profileController.getFollowingById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(200);
			expect(mockRes.json).toBeCalledWith(followers);
		});
		it('should throw 404 Followers not found', async () => {
			const mockReq = { 'params': { 'userId': 1 }, 'user': { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'getFollowingById')
				.mockRejectedValue(new HTTPError(404, 'User not found'));
			await profileController.getFollowingById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(404);
			expect(mockRes.status().json).toBeCalledWith({ message: 'User not found' });
		});
		it('should throw 500 error', async () => {
			const mockReq = { 'params': { 'userId': 1 }, 'user': { id: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'getFollowingById').mockRejectedValue(new Error());
			await profileController.getFollowingById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(500);
		});
	});
	describe('DELETE /profile/unfollow/{userId}', () => {
		it('should unfollow {userId} & return 200 OK', async () => {
			const mockReq = { 'params': { 'userId': 1 }, 'user': { 'id': 2 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				sendStatus: jest.fn()
			};
			jest.spyOn(profileService, 'unfollowById').mockResolvedValue(1);
			await profileController.unfollowById(mockReq, mockRes);
			expect(mockRes.sendStatus).toBeCalledWith(204);
		});
		it('should return 200 OK with Not following user', async () => {
			const mockReq = { 'params': { 'userId': 1 }, 'user': { 'id': 2 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'unfollowById').mockResolvedValue(0);
			await profileController.unfollowById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(404);
			expect(mockRes.json).toBeCalledWith({ message: 'Not following user' });
		});
		// it('should throw 404 Not following', async () => {
		// 	const mockReq = { 'params': { 'userId': 1 },  'user':{'id':2} };
		// 	const  mockRes = {
		// 		status: jest.fn().mockReturnThis(),
		// 		json: jest.fn()
		// 	};
		// 	jest.spyOn(profileService, 'unfollowById').mockRejectedValue(new HTTPError(404, 'Not following user'));
		// 	await profileController.unfollowById(mockReq, mockRes);
		// 	expect(mockRes.status).toBeCalledWith(404);
		// 	expect(mockRes.json).toBeCalledWith({ message: 'Not following user' });
		// });
		it('should throw 500 error', async () => {
			const mockReq = { 'params': { 'userId': 1 }, 'user': { 'id': 2 } };
			const mockRes = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			jest.spyOn(profileService, 'unfollowById').mockRejectedValue(new Error());
			await profileController.unfollowById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(500);
		});
	});
});