const actionService = require('../../src/services/action.service');
const { Action, Entity } = require('../../src/models');
const { actionTypes } = require('../../src/utils/constants');

describe('Action Service', () => {
    describe('postAction', () => {
        it('should create a new LIKE', async () => {
            const actionResponse = {
                "id": 57,
                "type": actionTypes.LIKE,
                "entityId": 21,
                "createdBy": 1,
                "meta": null,
                "updatedAt": "2023-02-16T15:56:11.998Z",
                "createdAt": "2023-02-16T15:56:11.998Z"
            }
            jest.spyOn(Action, 'create').mockResolvedValue(actionResponse);
            jest.spyOn(Entity, 'increment').mockResolvedValue({});
            const action = await actionService.postAction(actionTypes.LIKE, 1, 1);
            expect(action).toEqual(actionResponse);
        });
        it('should create a new COMMENT', async () => {
            const actionResponse = {
                "id": 57,
                "type": actionTypes.COMMENT,
                "entityId": 21,
                "createdBy": 1,
                "meta": null,
                "updatedAt": "2023-02-16T15:56:11.998Z",
                "createdAt": "2023-02-16T15:56:11.998Z"
            }
            jest.spyOn(Action, 'create').mockResolvedValue(actionResponse);
            jest.spyOn(Entity, 'increment').mockResolvedValue({});
            const action = await actionService.postAction(actionTypes.COMMENT, 1, 1, { comment: 'Hello World' });
            expect(action).toEqual(actionResponse);
        });
        it('should throw an error when DB fails', async () => {
            jest.spyOn(Action, 'create').mockRejectedValue(new Error('DB Error'));
            await expect(actionService.postAction(actionTypes.LIKE, 1, 1)).rejects.toThrow('DB Error');
        });
    });
    describe('deleteAction', () => {
        it('should delete an Like', async () => {
            jest.spyOn(Action, 'findOne').mockResolvedValue({ id: 1, type: actionTypes.LIKE, createdBy: 1 });
            jest.spyOn(Action, 'destroy').mockResolvedValue(1);
            jest.spyOn(Entity, 'decrement').mockResolvedValue({});
            const action = await actionService.deleteAction(1, 1);
            expect(action).toEqual(true);
        });
        it('should delete an Comment', async () => {
            jest.spyOn(Action, 'findOne').mockResolvedValue({ id: 1, type: actionTypes.COMMENT, createdBy: 1 });
            jest.spyOn(Action, 'destroy').mockResolvedValue(1);
            jest.spyOn(Entity, 'decrement').mockResolvedValue({});
            const action = await actionService.deleteAction(1, 1);
            expect(action).toEqual(true);
        });
        it('should throw 404 HTTPError when action is not found', async () => {
            jest.spyOn(Action, 'findOne').mockResolvedValue(null);
            await expect(actionService.deleteAction(1, 1)).rejects.toThrow('Action not found');
        });
        it('should throw 403 HTTPError when user is not authorized to delete action', async () => {
            jest.spyOn(Action, 'findOne').mockResolvedValue({ id: 1, type: actionTypes.LIKE, createdBy: 1 });
            await expect(actionService.deleteAction(1, 2)).rejects.toThrow('Unauthorized to delete this action');
        });
    });
});
