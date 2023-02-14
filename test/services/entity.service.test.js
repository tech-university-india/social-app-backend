const { Entity } = require('../../src/models');
// const HTTPError = require('../../src/errors/http.error');
const entitiesService = require('../../src/services/entities.service');
describe('Entity Service', () => {
  describe('Create Post', () => {
    it('should return 201 CREATED', async () => {
      const mockBody = {
        type: 'announcement',
        caption: 'This is an announcement',
        imageURL: 'https://example.com/image1.jpg',
        meta: {
          date: '2023-02-08',
          venue: 'Online'
        },
        location: 'Online',
        createdBy: 'John Doe',
      };

      jest.spyOn(Entity, 'create').mockResolvedValue(mockBody);
      expect(await entitiesService.createPost(mockBody.type, mockBody.caption, mockBody.imageURL, mockBody.meta, mockBody.location, mockBody.createdBy)).toEqual(mockBody);
    });
  });
});