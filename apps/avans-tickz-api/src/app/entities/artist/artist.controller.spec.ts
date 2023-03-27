import { Test, TestingModule } from '@nestjs/testing';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Types } from 'mongoose';
import { Artist } from './artist.schema';

describe('ArtistController', () => {
  let app: TestingModule;
  let controller: ArtistController;
  let service: ArtistService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            getAllArtists: jest.fn(),
            getArtistById: jest.fn(),
            createArtist: jest.fn(),
            updateArtist: jest.fn(),
            deleteArtistById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<ArtistController>(ArtistController);
    service = app.get<ArtistService>(ArtistService);
  });

  describe('getAllArtists', () => {
    it('should call getAll on the service', async () => {
      const exampleArtists: Artist[] = [
        {
          name: 'John Doe',
          birthDate: new Date('1990-01-01'),
          genre: 'Rock',
          description: 'A talented musician',
          artistImage: 'https://example.com/john-doe.jpg',
          artistHeader: 'https://example.com/john-doe-header.jpg',
          creatorId: new Types.ObjectId(),
        },
        {
          name: 'Jane Doe',
          birthDate: new Date('1999-01-12'),
          genre: 'Classic',
          description: 'A talented musician',
          artistImage: 'https://example.com/jane-doe.jpg',
          artistHeader: 'https://example.com/jane-doe-header.jpg',
          creatorId: new Types.ObjectId(),
        },
      ];

      const getArtists = jest
        .spyOn(service, 'getAllArtists')
        .mockImplementation(async () => exampleArtists);

      const results = await controller.getArtists();

      expect(getArtists).toBeCalledTimes(1);
      expect(results).toHaveLength(2);

      expect(results[0]).toHaveProperty('name', exampleArtists[0].name);
      expect(results[0]).toHaveProperty(
        'birthDate',
        exampleArtists[0].birthDate
      );
      expect(results[0]).toHaveProperty('genre', exampleArtists[0].genre);
      expect(results[0]).toHaveProperty(
        'description',
        exampleArtists[0].description
      );
      expect(results[0]).toHaveProperty(
        'artistImage',
        exampleArtists[0].artistImage
      );
      expect(results[0]).toHaveProperty(
        'artistHeader',
        exampleArtists[0].artistHeader
      );
      expect(results[0]).toHaveProperty(
        'creatorId',
        exampleArtists[0].creatorId
      );

      expect(results[1]).toHaveProperty('name', exampleArtists[1].name);
      expect(results[1]).toHaveProperty(
        'birthDate',
        exampleArtists[1].birthDate
      );
      expect(results[1]).toHaveProperty('genre', exampleArtists[1].genre);
      expect(results[1]).toHaveProperty(
        'description',
        exampleArtists[1].description
      );
      expect(results[1]).toHaveProperty(
        'artistImage',
        exampleArtists[1].artistImage
      );
      expect(results[1]).toHaveProperty(
        'artistHeader',
        exampleArtists[1].artistHeader
      );
      expect(results[1]).toHaveProperty(
        'creatorId',
        exampleArtists[1].creatorId
      );
    });
  });

  describe('getArtistById', () => {
    it('should call getById on the service', async () => {
      const exampleArtist: Artist = {
        name: 'John Doe',
        birthDate: new Date('1990-01-01'),
        genre: 'Rock',
        description: 'A talented musician',
        artistImage: 'https://example.com/john-doe.jpg',
        artistHeader: 'https://example.com/john-doe-header.jpg',
        creatorId: new Types.ObjectId(),
      };

      const getArtistById = jest
        .spyOn(service, 'getArtistById')
        .mockImplementation(async () => exampleArtist);

      const artistId = '639a6d184362b5279e5094a0';

      const result = await controller.getArtist(artistId);

      expect(getArtistById).toBeCalledTimes(1);

      expect(result).toHaveProperty('name', exampleArtist.name);
      expect(result).toHaveProperty('birthDate', exampleArtist.birthDate);
      expect(result).toHaveProperty('genre', exampleArtist.genre);
      expect(result).toHaveProperty('description', exampleArtist.description);
      expect(result).toHaveProperty('artistImage', exampleArtist.artistImage);
      expect(result).toHaveProperty('artistHeader', exampleArtist.artistHeader);
      expect(result).toHaveProperty('creatorId', exampleArtist.creatorId);
    });
  });

  describe('createArtist', () => {
    it('should create an artist', async () => {
      const exampleArtist: Artist = {
        name: 'John Doe',
        birthDate: new Date('1990-01-01'),
        genre: 'Rock',
        description: 'A talented musician',
        artistImage: 'https://example.com/john-doe.jpg',
        artistHeader: 'https://example.com/john-doe-header.jpg',
        creatorId: new Types.ObjectId(),
      };

      const createArtist = jest
        .spyOn(service, 'createArtist')
        .mockImplementation(async () => exampleArtist);

      const result = await controller.createArtist(exampleArtist);

      expect(createArtist).toBeCalledTimes(1);
      expect(result).toHaveProperty('name', exampleArtist.name);
      expect(result).toHaveProperty('birthDate', exampleArtist.birthDate);
      expect(result).toHaveProperty('genre', exampleArtist.genre);
      expect(result).toHaveProperty('description', exampleArtist.description);
      expect(result).toHaveProperty('artistImage', exampleArtist.artistImage);
      expect(result).toHaveProperty('artistHeader', exampleArtist.artistHeader);
      expect(result).toHaveProperty('creatorId', exampleArtist.creatorId);
    });
  });

  describe('updateArtist', () => {
    it('should update an artist', async () => {
      const exampleArtist: Artist = {
        name: 'John Doe',
        birthDate: new Date('1990-01-01'),
        genre: 'Rock',
        description: 'A talented musician',
        artistImage: 'https://example.com/john-doe.jpg',
        artistHeader: 'https://example.com/john-doe-header.jpg',
        creatorId: new Types.ObjectId(),
      };

      const updateArtist = jest
        .spyOn(service, 'updateArtist')
        .mockImplementation(async () => exampleArtist);

      const artistId = new Types.ObjectId();

      const result = await controller.updateArtist(artistId, exampleArtist);

      expect(updateArtist).toBeCalledTimes(1);
      expect(result).toHaveProperty('name', exampleArtist.name);
      expect(result).toHaveProperty('birthDate', exampleArtist.birthDate);
      expect(result).toHaveProperty('genre', exampleArtist.genre);
      expect(result).toHaveProperty('description', exampleArtist.description);
      expect(result).toHaveProperty('artistImage', exampleArtist.artistImage);
      expect(result).toHaveProperty('artistHeader', exampleArtist.artistHeader);
      expect(result).toHaveProperty('creatorId', exampleArtist.creatorId);
    });
  });

  describe('deleteArtist', () => {
    it('should delete an artist', async () => {
      const deleteArtistById = jest
        .spyOn(service, 'deleteArtistById')
        .mockResolvedValue(undefined);

      const artistId = '639a6d184362b5279e5094a0';
      const result = await controller.deleteArtist(artistId);

      expect(deleteArtistById).toBeCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
});