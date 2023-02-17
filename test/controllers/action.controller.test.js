const actionController = require('../../src/controllers/action.controller');
const actionService = require('../../src/services/action.service');
const { actionTypes } = require('../../src/utils/constants');
const HTTPError = require('../../src/errors/httpError');

describe('Action Controller', () => {
    describe('postAction', () => {
        it('should create a new action', async () => {
            const action = {
                type: actionTypes.LIKE,
                entityId: 1,
                createdBy: 1,
                meta: {}
            };
            const mockReq = {
                body: action,
                user: { id: 1 }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            jest.spyOn(actionService, 'postAction').mockResolvedValue(action);
            await actionController.postAction(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(action);
        });
        it('should throw HTTPError', async () => {
            const mockReq = {
                body: {},
                user: { id: 1 }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            jest.spyOn(actionService, 'postAction').mockRejectedValue(new HTTPError(400, 'Error'));
            await actionController.postAction(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error' });
        });
        it('should return 500 if actionService throws an error', async () => {
            const mockReq = {
                body: {},
                user: { id: 1 }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            jest.spyOn(actionService, 'postAction').mockRejectedValue(new Error('Error'));
            await actionController.postAction(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error' });
        });
    });
    describe('deleteAction', () => {
        it('should delete an action', async () => {
            const mockReq = {
                params: { actionId: 1 },
                user: { id: 1 }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                sendStatus: jest.fn()
            };
            jest.spyOn(actionService, 'deleteAction').mockResolvedValue(true);
            await actionController.deleteAction(mockReq, mockRes);
            expect(mockRes.sendStatus).toHaveBeenCalledWith(204)
        });
        it('should throw HTTPError', async () => {
            const mockReq = {
                params: { actionId: 1 },
                user: { id: 1 }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                sendStatus: jest.fn()
            };
            jest.spyOn(actionService, 'deleteAction').mockRejectedValue(new HTTPError(400, 'Error'));
            await actionController.deleteAction(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error' });
        });
        it('should return 500 if actionService throws an error', async () => {
            const mockReq = {
                params: { actionId: 1 },
                user: { id: 1 }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                sendStatus: jest.fn()
            };
            jest.spyOn(actionService, 'deleteAction').mockRejectedValue(new Error('Error'));
            await actionController.deleteAction(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error' });
        });
    });
});