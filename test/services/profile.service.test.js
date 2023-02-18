const profileService = require('../../src/services/profile.service');
const paginationUtil = require('../../src/utils/pagination.util');
const { User, Follow, UserInterest } = require('../../src/models');
const HTTPError = require('../../src/errors/httperror');

describe('Profile Service', () => {
	describe('Search Profiles', () => {
		it('should return 200 with profiles without userName and interestName', async () => {
			const users = [
				{
					"FMNO": 3,
					"userName": "Jim Smith",
					"bio": "full-stack developer and music lover",
					"designation": "Team Lead",
					"profilePictureURL": "https://example.com/image3.jpg",
					"updatedAt": "2023-02-17T18:11:48.136Z",
					"Interests": [
						{ "id": 2, "interestName": "trekking" }
					],
					"Following": [
						{"FMNO": 1 }
					]
				}
			]
			jest.spyOn(User, 'findAll').mockResolvedValue(users);
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: 1, limit: 10, offset: 0, nextURL: "next" })
			expect(await profileService.searchProfiles(1)).toEqual({ items: users, meta: { next: null } });
		});
		it('should return 200 with profiles with userName', async () => {
			const users = [
				{
					"FMNO": 3,
					"userName": "Jim Smith",
					"bio": "full-stack developer and music lover",
					"designation": "Team Lead",
					"profilePictureURL": "https://example.com/image3.jpg",
					"updatedAt": "2023-02-17T18:11:48.136Z",
					"Interests": [
						{ "id": 2, "interestName": "trekking" }
					],
					"Following": [
						{"FMNO": 1 }
					]
				}
			]
			jest.spyOn(User, 'findAll').mockResolvedValue(users);
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: 1, limit: 1, offset: 0, nextURL: "next" })
			expect(await profileService.searchProfiles(1)).toEqual({ items: users, meta: { next: "next" } });
		});
		it('should return 200 with profiles with interestName', async () => {
			const users = [
				{
					"FMNO": 3,
					"userName": "Jim Smith",
					"bio": "full-stack developer and music lover",
					"designation": "Team Lead",
					"profilePictureURL": "https://example.com/image3.jpg",
					"updatedAt": "2023-02-17T18:11:48.136Z",
					"Interests": [
						{ "id": 2, "interestName": "trekking" }
					],
					"Following": [
						{"FMNO": 1 }
					]
				}
			]
			jest.spyOn(User, 'findAll').mockResolvedValue(users);
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: 1, limit: 10, offset: 0, nextURL: "next" })
			expect(await profileService.searchProfiles(1)).toEqual({ items: users, meta: { next: null }});
		});
		it('should return 200 with profiles with both userName and interestName', async () => {
			const users = [
				{
					"FMNO": 3,
					"userName": "Jim Smith",
					"bio": "full-stack developer and music lover",
					"designation": "Team Lead",
					"profilePictureURL": "https://example.com/image3.jpg",
					"updatedAt": "2023-02-17T18:11:48.136Z",
					"Interests": [
						{ "id": 2, "interestName": "trekking" }
					],
					"Following": [
						{"FMNO": 1 }
					]
				}
			]
			jest.spyOn(User, 'findAll').mockResolvedValue(users);
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: 1, limit: 1, offset: 0, nextURL: "next" })
			expect(await profileService.searchProfiles(1)).toEqual({ items: users, meta: { next: "next" }});
		});
		it('should 500 id DB error', async () => {
			jest.spyOn(User, 'findAll').mockRejectedValue(new Error('DB Error'));
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: 1, limit: 1, offset: 0, nextURL: "next" })
			await expect(profileService.searchProfiles(1, 'Jim', 'trekking')).rejects.toThrow('DB Error');
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
			jest.spyOn(Follow, 'create').mockResolvedValue(followDetails)
			expect(await profileService.followUser(1, 90)).toEqual(followDetails);
		});

	});
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
			expect(await profileService.getUserById(1, 1)).toEqual(user);
		});
		it('should return 404 if user not found', async () => {
			jest.spyOn(User, 'findByPk').mockResolvedValue(null);
			expect(async () => await profileService.getUserById(1, 1)).rejects.toThrow(new HTTPError(404, 'User not found'));
		});
		it('should return 404 if user not found', async () => {
			jest.spyOn(User, 'findByPk').mockRejectedValue(new Error());
			expect(async () => await profileService.getUserById(1, 1)).rejects.toThrow(new Error());
		});
	});
	describe('Get Followers By Id', () => {
		it('should return 200 with followers list', async () => {
			const mockFindAll = [
				{
					"User": {
						"FMNO": 3,
						"designation": "Team Lead",
						"userName": "Jim Smith",
						"profilePictureURL": "https://example.com/image3.jpg",
						"following": "1"
					}
				},
				{
					"User": {
						"FMNO": 5,
						"designation": "Consultant",
						"userName": "Tom Brown",
						"profilePictureURL": "https://example.com/image5.jpg",
						"following": "1"
					}
				},
				{
					"User": {
						"FMNO": 1,
						"designation": "Partner",
						"userName": "John Doe",
						"profilePictureURL": "https://example.com/image1.jpg",
						"following": "0"
					}
				}
			];
			jest.spyOn(Follow, 'findAll').mockResolvedValue(mockFindAll);
			expect(await profileService.getFollowersById(2, 1)).toEqual(mockFindAll);
		});
		it('should return status code 404 when user doesnt not exist', async () => {
			jest.spyOn(Follow, 'findAll').mockRejectedValue(new Error());
			expect(async () => await profileService.getFollowersById(1, 1)).rejects.toThrow(new Error());
		});
	});

	describe('Update Profile', () => {
		it('should return 200 with updated profile', async () => {
			const mockFindOne = {
				"userName": "rm19",
				"designation": "sde1",
				"bio": "I'M GOOD ",
				"profilePictureURL": "https://example.com/image7.jpg",
				"interests": [
					{
						"interestId": 1,
						"interestName": "Javascript"
					}
				]
			};
			const mockUpdate = {
				"updatedInterests": [
					{
						"id": 11,
						"userId": 1,
						"interestId": 1,
						"createdAt": "2023-02-17T05:08:10.209Z"
					}
				],
				"updateProfile": 1
			};
			jest.spyOn(User, 'update').mockResolvedValue([1]);
			jest.spyOn(UserInterest, 'destroy').mockResolvedValue(1);
			jest.spyOn(UserInterest, 'bulkCreate').mockResolvedValue([
				{
					"id": 11,
					"userId": 1,
					"interestId": 1,
					"createdAt": "2023-02-17T05:08:10.209Z"
				}
			]);
			expect(await profileService.updateProfile(1, mockFindOne)).toEqual(mockUpdate);
		});
		it('should return 400 if profile cannot be updated', async () => {
			const mockFindOne = {
				"userName": "rm19",
				"designation": "sde1",
				"bio": "I'M GOOD ",
				"profilePictureURL": "https://example.com/image7.jpg",
				"interests": [
					{
						"interestId": 1,
						"interestName": "Javascript"
					}
				]
			};
			jest.spyOn(User, 'update').mockResolvedValue([0]);
			expect(async () => await profileService.updateProfile(1, mockFindOne)).rejects.toThrow(new HTTPError(400, 'User not updated'));
		});
		it('should return 500 if DB Fails', async () => {
			const mockFindOne = {
				"userName": "rm19",
				"designation": "sde1",
				"bio": "I'M GOOD ",
				"profilePictureURL": "https://example.com/image7.jpg",
				"interests": [
					{
						"interestId": 1,
						"interestName": "Javascript"
					}
				]
			};
			jest.spyOn(User, 'update').mockRejectedValue(new Error());
			expect(async () => await profileService.updateProfile(1, mockFindOne)).rejects.toThrow(new Error());
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
					dataValues: {
						'FMNO': 1,
						'designation': 'Partner',
						'userName': 'John Doe',
						'profilePictureURL': 'https://example.com/image1.jpg',
						'Followers': [{
							dataValues:{
								'FMNO': 2,
								'designation': 'Manager',
								'userName': 'Jane Doe',
								'profilePictureURL': 'https://example.com/image2.jpg'
							},
						}]
					}
				}]
			};
			jest.spyOn(Follow, 'findAll').mockResolvedValue(mockFindAll);
			expect(await profileService.getFollowingById(2, 1)).toEqual(mockFindAll);

		});
		it('should return status code 404 when user doesnt not exist', async () => {
			jest.spyOn(Follow, 'findAll').mockRejectedValue(new Error());
			expect(async () => await profileService.getFollowingById(1, 1)).rejects.toThrow(new Error());
		});
	});
	describe('Unfollow User', () => {
		it('should unfollow user', async () => {
			jest.spyOn(Follow, 'destroy').mockResolvedValue(1);
			expect(await profileService.unfollowById(2, 3)).toEqual(1);
		});
		it('should throw 404 when user doesnt follow given id', async () => {
			// jest.spyOn(Follow, 'findOne').mockResolvedValue(0);
			jest.spyOn(Follow, 'destroy').mockRejectedValue(new Error());;
			expect(async () => await profileService.unfollowById(2, 3)).rejects.toThrow(new Error());
		});
	});




});

