import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';
import { Artist } from './artist.schema';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistController } from './artist.controller';

describe('ArtistService', () => {
  let app: TestingModule;
  let service: ArtistService;
  let repository: ArtistRepository;

  const artistId = new Types.ObjectId();

  const artist: Artist = {
    name: 'John Doe',
    birthDate: new Date('1990-01-01'),
    genre: 'Rock',
    description: 'A talented musician',
    artistImage: 'https://example.com/john-doe.jpg',
    artistHeader: 'https://example.com/john-doe-header.jpg',
    creatorId: new Types.ObjectId(),
  };

  const exampleArtists: Artist[] = [
    artist,
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

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        ArtistService,
        {
          provide: ArtistRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue(artist),
            find: jest.fn(),
            create: jest.fn().mockResolvedValue(artist),
            findOneAndUpdate: jest.fn().mockResolvedValue(artist),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<ArtistService>(ArtistService);
    repository = app.get<ArtistRepository>(ArtistRepository);
  });

  describe('getArtistById', () => {
    it('should return an artist', async () => {
      const result = await service.getArtistById(artistId.toString());

      expect(result).toEqual(artist);
      expect(result).toHaveProperty('name', artist.name);
      expect(result).toHaveProperty('birthDate', artist.birthDate);
      expect(result).toHaveProperty('genre', artist.genre);
      expect(result).toHaveProperty('description', artist.description);
      expect(result).toHaveProperty('artistImage', artist.artistImage);
      expect(result).toHaveProperty('artistHeader', artist.artistHeader);
      expect(result).toHaveProperty('creatorId', artist.creatorId);

      expect(repository.findById).toBeCalledTimes(1);
    });
  });

  describe('getAllArtists', () => {
    it('should return an array of artists', async () => {
      const find = jest
        .spyOn(repository, 'find')
        .mockImplementation(async () => exampleArtists);

      const results = await service.getAllArtists();

      expect(find).toBeCalledTimes(1);
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

  //   describe('createArtist', () => {
  //     it('should create a new artist', async () => {
  //       const result = await service.createArtist(
  //         createArtistDto.name,
  //         createArtistDto.birthDate,
  //         createArtistDto.genre,
  //         createArtistDto.description,
  //         createArtistDto.artistImage,
  //         createArtistDto.artistHeader,
  //         createArtistDto.creatorId
  //       );
  //       expect(result).toEqual(artist);
  //       expect(repository.create).toHaveBeenCalledWith(createArtistDto);
  //     });
  //   });

  //   describe('updateArtist', () => {
  //     it('should update an artist', async () => {
  //       const result = await service.updateArtist(artistId, updateArtistDto);
  //       expect(result).toEqual(artist);
  //       expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
  //         { _id: artistId },
  //         updateArtistDto
  //       );
  //     });
  //   });

  //   describe('deleteArtistById', () => {
  //     it('should delete an artist', async () => {
  //       await service.deleteArtistById(artistId);
  //       expect(repository.deleteById).toHaveBeenCalledWith(artistId);
  //     });
  //   });
});
