const actionValidator = require('../../src/middlewares/action.validator');
const { actionTypes } = require('../../src/utils/constants');

describe('Action Validator', () => {
    describe('postActionValidator', () => {
        it('should call the next function on proper Input', () => {
            const mockReq = {
                body: {
                    type: actionTypes.COMMENT,
                    entityId: 1,
                    meta: { comment: 'test' }
                }
            };
            const mockRes = {};
            const mockNext = jest.fn();
            actionValidator.postActionValidator(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
        it('should return 400 if type is not provided', () => {
            const mockReq = {
                body: {
                    entityId: 1,
                    meta: { comment: 'test' }
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockNext = jest.fn();
            actionValidator.postActionValidator(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: '\"type\" is required' });
        });
    });
    describe('deleteActionValidator', () => {
        it('should call the next function on proper Input', () => {
            const mockReq = {
                params: {
                    actionId: 1
                }
            };
            const mockRes = {};
            const mockNext = jest.fn();
            actionValidator.deleteActionValidator(mockReq, mockRes, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
        it('should return 400 if actionId is not provided', () => {
            const mockReq = {
                params: {}
            };
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockNext = jest.fn();
            actionValidator.deleteActionValidator(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: '\"actionId\" is required' });
        });
    });
});
