const interestService = require('../../src/services/interest.service');
const { Interest } = require('../../src/models');

describe('Interest Service', () => {
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



