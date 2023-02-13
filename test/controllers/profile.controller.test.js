const HTTPError = require('../../src/errors/httperror');
const profileController = require('../../src/controllers/profile.controller');
const profileService = require('../../src/services/profile.service');

describe('Profile Controller', () => {
    describe('GET /profile/{userId}', () => {
        it('should return 200 OK', async () => {
            const user = {
                "FMNO": 1,
                "email": "exampleuser1@example.com",
                "bio": "Backend and fishing expert",
                "userName": "John Doe",
                "designation": "Partner",
                "profilePictureURL": "https://example.com/image1.jpg",
                "createdAt": "2023-02-08T17:56:02.800Z",
                "updatedAt": "2023-02-08T17:56:02.800Z"
            }
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

    describe('POST /profile/follow', () => {
        it('should return 201 OK', async () => {
            const user = {
                "id": 15,
                "followerId": 90,
                "followingId": 1,
                "createdAt": "2023-02-13T05:29:58.286Z"
            }
            jest.spyOn(profileService, 'followUser').mockResolvedValue(user);
            const mockReq = { body: { userId: 1 }, user: { id: 90 } };

            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            await profileController.followUser(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(201);
            expect(mockRes.status().json).toBeCalledWith(user);
        });
    });
    it('should throw 400 Bad Request', async () => {
        jest.spyOn(profileService, 'followUser').mockRejectedValue(new HTTPError(400, 'Bad Request'));
        const mockReq = { body: { userId: 1 }, user: { id: 90 } };
        const mockRes = {
            status: jest.fn().mockReturnValue({ json: jest.fn() })
        };
        await profileController.followUser(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(400);
        expect(mockRes.status().json).toBeCalledWith({ message: 'Bad Request' });
    }
    );
    it('should throw 400', async () => {
        jest.spyOn(profileService, 'followUser').mockRejectedValue(new HTTPError(401, 'Unauthorized'));
        const mockReq = { body: { userId: 1 }, user: { id: 90 } };
        const mockRes = {
            status: jest.fn().mockReturnValue({ json: jest.fn() })
        };
        await profileController.followUser(mockReq, mockRes);
        expect(mockRes.status).toBeCalledWith(401);
        expect(mockRes.status().json).toBeCalledWith({ message: 'Unauthorized' });
    });
});
