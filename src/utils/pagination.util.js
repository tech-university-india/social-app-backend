const HTTPError = require('../errors/httpError');

const paginate = ({ path, queryParams, pageDate = Date.now(), page = 1, size = 10 }) => {
	if(!path || !queryParams || !pageDate || !page || !size) throw new HTTPError(400, 'Invalid pagination request');
	queryParams = { ...queryParams, pageDate: Number(pageDate), page: Number(page)+1, size: Number(size) };
	return {
		pageTimeStamp: new Date(Number(pageDate)),
		offset: (Number(page) - 1) * Number(size),
		limit: Number(size),
		nextURL: `${path}?${Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')}`,
	};
};


module.exports = { paginate };