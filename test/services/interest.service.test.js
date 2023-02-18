const interestService = require('../../src/services/interest.service');
const {Interest} = require('../../src/models');
const HTTPError = require('../../src/errors/httperror');

describe('Interest Service', () => {
	describe('Post Interest', () => {

		const mockInterest = {
			'interestName': 'Fishing',
            
		};
		const mockResult = {
			id: 1,
			interestName: 'fishing',
			createdAt: '2021-03-31T18:30:00.000Z',
			updatedAt: '2021-03-31T18:30:00.000Z'
		};

		it('should return 201 with interest', async () => {
			
			jest.spyOn(Interest, 'create').mockResolvedValue(mockResult);
			expect(await interestService.postInterest(mockInterest)).toEqual(mockResult);
		});

		it('should return 501 if interest not created', async () => {
			jest.spyOn(Interest, 'create').mockResolvedValue(null);
			expect(async () => await interestService.postInterest(mockInterest)).rejects.toThrow(new HTTPError(501, 'Invalid Data'));
		}
		);
	});
});



