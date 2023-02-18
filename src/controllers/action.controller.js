const HTTPError = require('../errors/httpError');
const actionService = require('../services/action.service');

const postAction = async (req, res) => {
	try {
		const { type, entityId, meta } = req.body;
		const action = await actionService.postAction(type, entityId, req.user.id, meta);
		res.status(201).json(action);
	} catch (error) {
		if (error instanceof HTTPError) return res.status(error.statusCode).json({ error: error.message });
		res.status(500).json({ error: error.message });
	}
};

const deleteAction = async (req, res) => {
	try {
		await actionService.deleteAction(req.params.actionId, req.user.id);
		res.sendStatus(204);
	} catch (error) {
		if (error instanceof HTTPError) return res.status(error.statusCode).json({ error: error.message });
		res.status(500).json({ error: error.message });
	}
};

module.exports = { postAction, deleteAction };