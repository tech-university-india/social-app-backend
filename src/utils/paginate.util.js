const paginate = ( pageDate = Date.now(), page = 1, size = 10) => {
	const offset = (Number(page) - 1) * Number(size);
	const limit = Number(size);
	const pageTimeStamp = new Date(Number(pageDate));
	return { pageTimeStamp, limit, offset };
};

const paginateResponseFormatter = (data, path, queryParams, pageDate, page, size) => {
	queryParams = { ...queryParams, pageDate, page: page+1, size };
	const nextURL = `${path}?${Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')}`;
	console.log(nextURL);
	return {
		items: data,
		meta: { next: nextURL }
	};
};

module.exports = { paginate, paginateResponseFormatter };