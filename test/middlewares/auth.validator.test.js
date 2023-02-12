const JWT = require('jsonwebtoken');

const authValidator = require('../../src/middlewares/auth.validator');

describe('Auth Validator', () => {
  describe('Register Validator', () => {
    it('should return nothing if all fields are valid', async () => {
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
      const mockNext = jest.fn();
      await authValidator.registerValidator(mockReq, mockRes, mockNext);
      expect(mockRes.status).not.toBeCalled();
      expect(mockNext).toBeCalled();
    });
    it('should return 400 "FMNO is required"', async () => {
      const mockReq = {
        body: {
          "FMNO": 12,
          "userName": "John Doe",
          "email": "abcdefg@gmail.com"
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.registerValidator(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ message: "\"password\" is required" });
      expect(mockNext).not.toBeCalled();
    });
    it('should return 400 "userName is required"', async () => {
      const mockReq = {
        body: {
          "FMNO": 12,
          "email": "abdbvjhds"
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.registerValidator(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ message: "\"email\" must be a valid email" });
      expect(mockNext).not.toBeCalled();
    });
  });
  describe('Login Validator', () => {
    it('should return nothing if all fields are valid', async () => {
      const mockReq = {
        body: {
          "email": "exampleuser1@example.com",
          "password": "pass@12354"
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.loginValidator(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });
    it('should return 400 "email is required"', async () => {
      const mockReq = {
        body: {
          "password": "pass@12354"
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.loginValidator(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ message: "\"email\" is required" });
      expect(mockNext).not.toBeCalled();
    });
    it('should return 400 "password is required"', async () => {
      const mockReq = {
        body: {
          "email": "exampleuser1@example.com",
        }
      }
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.loginValidator(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ message: "\"password\" is required" });
      expect(mockNext).not.toBeCalled();
    });
  });
  describe('JWT Validator', () => {
    it('should return nothing if all fields are valid', async () => {
      jest.spyOn(JWT, 'verify').mockReturnValue({ FMNO: 12 });
      const mockReq = {
        headers: {
          authorization: 'Bearer token'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.JWTVaidator(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });
    it('should return 401 Access token for Invalid Access Token', async () => {
      const mockReq = {
        headers: {
          authorization: 'token'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.JWTVaidator(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(401);
      expect(mockRes.status().json).toBeCalledWith({ message: 'Access denied' });
      expect(mockNext).not.toBeCalled();
    });
    it('should return 400 invalid token for Altered Access Token', async () => {
      jest.spyOn(JWT, 'verify').mockImplementation(() => { throw new Error('invalid token') });
      const mockReq = {
        headers: {
          authorization: 'Bearer tokken'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: jest.fn() })
      };
      const mockNext = jest.fn();
      await authValidator.JWTVaidator(mockReq, mockRes, mockNext);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.status().json).toBeCalledWith({ message: 'invalid token' });
      expect(mockNext).not.toBeCalled();
    });
  });
});