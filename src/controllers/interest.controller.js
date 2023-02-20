const interestService = require('../services/interest.service');
const HTTPError = require('../errors/httperror');

const getInterestsByName = async (req, res) => {
	try {
		const { interestName, pageDate = Date.now(), page = 1, size = 10 } = req.query;
		const options = {
			pageDate: pageDate,
			page: page,
			size: size,
			queryParams: req.query,
			path: `${req.baseUrl}${req.path}`
		};
		const interests = await interestService.getInterestsByName(interestName, options);
		res.status(200).json(interests);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const postInterest = async (req, res) => {
	try {
		const interest = await interestService.postInterest(req.body.interestName, req.user.id);
		res.status(201).json(interest);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getInterestsByName, postInterest };