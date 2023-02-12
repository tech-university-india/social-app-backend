const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const authService = require('../../src/services/auth.service');
const { User } = require('../../src/models');
const HTTPError = require('../../src/errors/httperror');

describe('Auth Service', () => {
  const user = {
    "FMNO": 1,
    "email": "exampleuser1@example.com",
    "bio": "Backend and fishing expert",
    "userName": "John Doe",
    "designation": "Partner",
    "profilePictureURL": "https://example.com/image1.jpg",
    "createdAt": "2023-02-08T17:56:02.800Z",
    "updatedAt": "2023-02-08T17:56:02.800Z"
  }
  describe('Register', () => {
    const mockBody = {
      "FMNO": 1,
      "email": "exampleuser1@example.com",
      "bio": "Backend and fishing expert",
      "userName": "John Doe",
      "designation": "Partner",
      "profilePictureURL": "https://example.com/image1.jpg",
    }
    it('should return 201 CREATED', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('pass@123');
      jest.spyOn(User, 'create').mockResolvedValue(user);
      jest.spyOn(JWT, 'sign').mockReturnValue('head.payload.signature');
      expect(await authService.register(mockBody)).toEqual('head.payload.signature');
    });
    it('should throw 400 "User already exists"', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      expect(async () => await authService.register(mockBody)).rejects.toThrow(new HTTPError(400, 'User already exists'));
    });
    it('should throw 500', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error());
      expect(async () => await authService.register(mockBody)).rejects.toThrow(new Error());
    });
  });
  describe('Login', () => {
    const mockBody = {
      "email": "exampleuser1@example.com",
      "password": "pass@123"
    }
    it('should return 200 OK', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(JWT, 'sign').mockReturnValue('head.payload.signature');
      expect(await authService.login(mockBody)).toEqual('head.payload.signature');
    });
    it('should throw 404 "User not found"', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      expect(async () => await authService.login(mockBody)).rejects.toThrow(new HTTPError(404, 'User not found'));
    });
    it('should throw 400 "Invalid credentials"', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      expect(async () => await authService.login(mockBody)).rejects.toThrow(new HTTPError(400, 'Invalid credentials'));
    });
    it('should throw 500', async () => {
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error());
      expect(async () => await authService.login(mockBody)).rejects.toThrow(new Error());
    });
  });
});