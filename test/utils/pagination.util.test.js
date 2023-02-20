const HTTPError = require('../../src/errors/httpError');
const paginationUtil = require('../../src/utils/pagination.util');

describe('Pagination Util', () => {
	it('should return valid response for valid request without optional parameters', () => {
		const options = {
			path: '/entities',
			queryParams: {}
		};
		const response = paginationUtil.paginate(options);
		expect(response.limit).toEqual(10);
		expect(response.offset).toEqual(0);

	});
	it('should return valid response for valid request with optional parameters', () => {
		const timestamp = Date.now();
		const options = {
			pageDate: timestamp,
			page: 1,
			size: 10,
			path: '/entities',
			queryParams: {}
		};
		expect(paginationUtil.paginate(options)).toEqual({ pageTimeStamp: expect.any(Date), offset: 0, limit: 10, nextURL: `/entities?pageDate=${timestamp}&page=2&size=10` });
	});
	it('should throw error if path is not given', () => {
		const timestamp = Date.now();
		const options = {
			pageDate: timestamp,
			page: 1,
			size: 10,
		};
		expect(() => paginationUtil.paginate(options)).toThrow(new HTTPError(400, 'Invalid pagination request'));
	});
});