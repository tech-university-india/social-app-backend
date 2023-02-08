const authService = require('../services/auth.service');
const HTTPError = require('../errors/httperror');

const register = async (req, res) => {
	try {
		const accessToken = await authService.register(req.body);
		res.status(201).json({ access_token: accessToken });
	} catch(err) {
		if(err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const accessToken = await authService.login(email, password);
		res.status(200).json({ access_token: accessToken });
	} catch(err) {
		if(err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(500).json({ message: err.message });
	}
};

module.exports = { register, login };