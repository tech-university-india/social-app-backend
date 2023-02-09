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
			const mockReq = { params: { userId: 1 } };
			const mockRes = {
				status: jest.fn().mockReturnValue({ json: jest.fn() })
			};
			await profileController.getUserById(mockReq, mockRes);
			expect(mockRes.status).toBeCalledWith(200);
			expect(mockRes.status().json).toBeCalledWith(user);
		});
		it('should throw 404 User not found', async () => {
			jest.spyOn(profileService, 'getUserById').mockRejectedValue(new HTTPError(404, 'User not found'));
			const mockReq = { params: { userId: 1 } };
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
});