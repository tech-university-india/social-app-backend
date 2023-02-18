const interestService = require('../services/interest.service');
const HTTPError = require('../errors/httperror');

const postInterest = async (req, res) => {
	try {
		const interest = await interestService.postInterest(req.body.interestName, req.user.id);
		res.status(201).json(interest);
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

module.exports = { postInterest };