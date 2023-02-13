const profileValidator = require('../../src/middlewares/profile.validator');

describe('Profile Validator', () => {
    describe('Get Profile By Id Validator', () => {
        it('should return nothing if all fields are valid', async () => {
            const mockReq = {
                params: {
                    userId: 1
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const mockNext = jest.fn();
            await profileValidator.getProfileByIdValidator(mockReq, mockRes, mockNext);
            expect(mockNext).toBeCalled();
        });
        it('should return 400 "id is required"', async () => {
            const mockReq = {
                params: {
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const mockNext = jest.fn();
            await profileValidator.getProfileByIdValidator(mockReq, mockRes, mockNext);
            expect(mockRes.status).toBeCalledWith(400);
            expect(mockRes.status().json).toBeCalledWith({ message: "\"userId\" is required" });
            expect(mockNext).not.toBeCalled();
        });
        it('should return 400 "id must be a number"', async () => {
            const mockReq = {
                params: {
                    userId: "sbv"
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const mockNext = jest.fn();
            await profileValidator.getProfileByIdValidator(mockReq, mockRes, mockNext);
            expect(mockRes.status).toBeCalledWith(400);
            expect(mockRes.status().json).toBeCalledWith({ message: "\"userId\" must be a number" });
            expect(mockNext).not.toBeCalled();
        });
    });

    describe('Follow User Validator', () => {
        it('should return nothing if all fields are valid', async () => {
            const mockReq = {
                body: {
                    userId: 1
                },
                user: {
                    id: 1
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const mockNext = jest.fn();
            await profileValidator.postFollowUserValidator(mockReq, mockRes, mockNext);
            expect(mockNext).toBeCalled();
        });
        it('should return 400 "userId is required"', async () => {
            const mockReq = {
                body: {
                },
                user: {
                    id: 1
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const mockNext = jest.fn();
            await profileValidator.postFollowUserValidator(mockReq, mockRes, mockNext);
            expect(mockRes.status).toBeCalledWith(400);
            expect(mockRes.status().json).toBeCalledWith({ message: "\"userId\" is required" });
            expect(mockNext).not.toBeCalled();
        }
        );
        it('should return 400 "userId must be a number"', async () => {
            const mockReq = {
                body: {
                    userId: "sbv"
                },
                user: {
                    id: 1
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            const mockNext = jest.fn();
            await profileValidator.postFollowUserValidator(mockReq, mockRes, mockNext);
            expect(mockRes.status).toBeCalledWith(400);
            expect(mockRes.status().json).toBeCalledWith({ message: "\"userId\" must be a number" });
            expect(mockNext).not.toBeCalled();
        });
    });
});