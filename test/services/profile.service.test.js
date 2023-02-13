const profileService = require('../../src/services/profile.service');
const { User, Follow } = require('../../src/models');
const HTTPError = require('../../src/errors/httperror');

describe('Profile Service', () => {
    describe('Get Profile By Id', () => {
        it('should return 200 with profile', async () => {
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
            jest.spyOn(User, 'findByPk').mockResolvedValue(user)
            expect(await profileService.getUserById(1)).toEqual(user);
        });
        it('should return 404 if user not found', async () => {
            jest.spyOn(User, 'findByPk').mockResolvedValue(null)
            expect(async () => await profileService.getUserById(1)).rejects.toThrow(new HTTPError(404, 'User not found'));
        });
        it('should return 404 if user not found', async () => {
            jest.spyOn(User, 'findByPk').mockRejectedValue(new Error())
            expect(async () => await profileService.getUserById(1)).rejects.toThrow(new Error());
        });
    });

    describe('Follow User', () => {
        it('should return 201 with follow', async () => {
            const user = {}
            const followDetails = {
                "id": 15,
                "followerId": 90,
                "followingId": 1,
                "createdAt": "2023-02-13T05:29:58.286Z"
            }
            jest.spyOn(User, 'findByPk').mockResolvedValue(user)
            jest.spyOn(Follow, 'create').mockResolvedValue(followDetails)
            expect(await profileService.followUser(1, 90)).toEqual(followDetails);
        });
        it('should return 404 if user not found', async () => {
            jest.spyOn(User, 'findByPk').mockResolvedValue(null)
            expect(async () => await profileService.followUser(1, 90)).rejects.toThrow(new HTTPError(404, 'User not found'));
        });
        it('should return 404 if user not found', async () => {
            jest.spyOn(User, 'findByPk').mockRejectedValue(new Error())
            expect(async () => await profileService.followUser(1, 90)).rejects.toThrow(new Error());
        });
    }
    );



});
