const interestService = require('../services/interest.service');
const HTTPError = require('../errors/httperror');

const postInterest = async (req, res) => {
	try {
		const interest = await interestService.postInterest(req.body);
		res.status(201).json({id: interest.id, interestName: interest.interestName});
	} catch( err )
	{
		if(err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message});
		res.status(501).json({message: 'Invalid Data'});
	}
};

module.exports = {postInterest};