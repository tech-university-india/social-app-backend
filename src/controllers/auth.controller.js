const authService = require('../services/auth.service');

const register = async (req, res) => {
	try {
		const createdUser = await authService.register(req.body);
		res.status(201).json(createdUser);
	} catch(err) {
		res.status(400).json({ message: err.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const accessToken = await authService.login(email, password);
		res.status(201).json({ access_token: accessToken });
	} catch(err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = { register, login };