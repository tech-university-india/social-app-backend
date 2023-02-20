const interestService = require('../../src/services/interest.service');
const paginationUtil = require('../../src/utils/pagination.util');
const { Interest } = require('../../src/models');

describe('Interest Service', () => {
	describe('Get Interest', () => {
		it('should return 200 with interests with interestName and without pagination', async () => {
			const interests = [
				{
					"id": 6,
					"interestName": "javascript"
				},
				{
					"id": 4,
					"interestName": "rock climbing"
				},
				{
					"id": 2,
					"interestName": "trekking"
				}
			];
			jest.spyOn(Interest, 'findAll').mockResolvedValue(interests);
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: '2021-03-31T18:30:00.000Z', limit: 4, offset: 0, nextURL: "next" });
			expect(await interestService.getInterestsByName('r')).toEqual({ items: interests, meta: { next: null } });
		});
		it('should return 200 with interests without interestName and with pagination', async () => {
			const interests = [
				{
					"id": 6,
					"interestName": "javascript"
				},
				{
					"id": 4,
					"interestName": "rock climbing"
				},
				{
					"id": 2,
					"interestName": "trekking"
				}
			];
			jest.spyOn(Interest, 'findAll').mockResolvedValue(interests);
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: '2021-03-31T18:30:00.000Z', limit: 3, offset: 0, nextURL: "next" });
			expect(await interestService.getInterestsByName()).toEqual({ items: interests, meta: { next: "next" } });
		});
		it('should throw 500 DB Error', async () => {
			jest.spyOn(Interest, 'findAll').mockRejectedValue(new Error());
			jest.spyOn(paginationUtil, 'paginate').mockReturnValue({ pageTimeStamp: '2021-03-31T18:30:00.000Z', limit: 3, offset: 0, nextURL: null });
			expect(async () => await interestService.getInterestsByName('')).rejects.toThrow(new Error());
		});
	});
	describe('Post Interest', () => {
		const mockResult = {
			id: 1,
			interestName: 'fishing',
			createdAt: '2021-03-31T18:30:00.000Z',
			updatedAt: '2021-03-31T18:30:00.000Z'
		};

		it('should return 201 with interest', async () => {
			jest.spyOn(Interest, 'create').mockResolvedValue(mockResult);
			expect(await interestService.postInterest('fishing')).toEqual(mockResult);
		});
		it('should return 500 DB Error', async () => {
			jest.spyOn(Interest, 'create').mockRejectedValue(new Error());
			expect(async () => await interestService.postInterest('fishing')).rejects.toThrow(new Error());
		}
		);
	});
});



