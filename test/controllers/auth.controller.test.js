const authService = require('../../src/services/auth.service');
const authController = require('../../src/controllers/auth.controller');
const HTTPError = require('../../src/errors/httperror');

describe('Auth Controller', () => {
    describe('POST /auth/register', () => {
        it('should return 201 CREATED', async () => {
            jest.spyOn(authService, 'register').mockResolvedValue("header.payload.signature");
            const mockReq = {
                body: {
                    "FMNO": 12,
                    "userName": "John Doe",
                    "email": "abcdefgh@gmail.com",
                    "password": "pass@123",
                    "designation": "designation"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            await authController.register(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(201);
            expect(mockRes.status().json).toBeCalledWith({ access_token: "header.payload.signature" });
        });
        it('should throw 404 "User not found"', async () => {
            jest.spyOn(authService, 'register').mockRejectedValue(new HTTPError(404, 'User already exists'));
            const mockReq = {
                body: {
                    "FMNO": 12,
                    "userName": "John Doe",
                    "email": "abcdefgh@gmail.com",
                    "password": "pass@123",
                    "designation": "designation"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            await authController.register(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.status().json).toBeCalledWith({ message: "User already exists" });
        });
        it('should throw 500', async () => {
            jest.spyOn(authService, 'register').mockRejectedValue(new Error());
            const mockReq = {
                body: {
                    "FMNO": 12,
                    "userName": "John Doe",
                    "email": "abcdefgh@gmail.com",
                    "password": "pass@123",
                    "designation": "designation"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            await authController.register(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
        });
    });
    describe('POST /auth/login', () => {
        it('should return 200 OK', async () => {
            jest.spyOn(authService, 'login').mockResolvedValue("header.payload.signature");
            const mockReq = {
                body: {
                    "email": "abcdefg@gmail.com",
                    "password": "pass@123"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            await authController.login(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(200);
            expect(mockRes.status().json).toBeCalledWith({ access_token: "header.payload.signature" });
        });
        it('should throw 404 "User not found"', async () => {
            jest.spyOn(authService, 'login').mockRejectedValue(new HTTPError(404, 'User not found'));
            const mockReq = {
                body: {
                    "email": "abcdefg@gmail.com",
                    "password": "pass@123"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            await authController.login(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(404);
            expect(mockRes.status().json).toBeCalledWith({ message: "User not found" });
        });
        it('should throw 500', async () => {
            jest.spyOn(authService, 'login').mockRejectedValue(new Error());
            const mockReq = {
                body: {
                    "email": "abcdefg@gmail.com",
                    "password": "pass@123"
                }
            };
            const mockRes = {
                status: jest.fn().mockReturnValue({ json: jest.fn() })
            };
            await authController.login(mockReq, mockRes);
            expect(mockRes.status).toBeCalledWith(500);
        });
    });
});