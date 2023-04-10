import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistService } from './artist.service';
import { Artist } from './artist.model';
import 'fast-text-encoding';
import { Types } from 'mongoose';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;

  const artist: Artist = {
    _id: new Types.ObjectId('6391333037ceb01d296c5982'),
    name: 'John Doe',
    birthDate: new Date('1990-01-01'),
    genre: 'Rock',
    description: 'A talented musician',
    artistImage: 'https://example.com/john-doe.jpg',
    artistHeader: 'https://example.com/john-doe-header.jpg',
    creatorId: new Types.ObjectId(),
  };
  const artist2: Artist = {
    _id: new Types.ObjectId('63913b615640812705d69976'),
    name: 'Jane Doe',
    birthDate: new Date('1999-01-12'),
    genre: 'Classic',
    description: 'A talented musician',
    artistImage: 'https://example.com/jane-doe.jpg',
    artistHeader: 'https://example.com/jane-doe-header.jpg',
    creatorId: new Types.ObjectId(),
  };
  const exampleArtists: Artist[] = [artist, artist2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService],
    });
    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAllArtists', () => {
    it('should get all artists>', () => {
      service.getAllArtists().subscribe((artists) => {
        expect(artists.length).toBe(2);
        expect(artists).toEqual(exampleArtists);

        expect(artists[0]._id).toEqual(exampleArtists[0]._id);
        expect(artists[0].name).toEqual(exampleArtists[0].name);
        expect(artists[0].genre).toEqual(exampleArtists[0].genre);
        expect(artists[0].birthDate).toEqual(exampleArtists[0].birthDate);
        expect(artists[0].description).toEqual(exampleArtists[0].description);
        expect(artists[0].artistImage).toEqual(exampleArtists[0].artistImage);
        expect(artists[0].artistHeader).toEqual(exampleArtists[0].artistHeader);
        expect(artists[0].creatorId).toEqual(exampleArtists[0].creatorId);
  
        expect(artists[1]._id).toEqual(exampleArtists[1]._id);
        expect(artists[1].name).toEqual(exampleArtists[1].name);
        expect(artists[1].genre).toEqual(exampleArtists[1].genre);
        expect(artists[1].birthDate).toEqual(exampleArtists[1].birthDate);
        expect(artists[1].description).toEqual(exampleArtists[1].description);
        expect(artists[1].artistImage).toEqual(exampleArtists[1].artistImage);
        expect(artists[1].artistHeader).toEqual(exampleArtists[1].artistHeader);
        expect(artists[1].creatorId).toEqual(exampleArtists[1].creatorId);
      });

      const req = httpMock.expectOne('http://localhost:3333/api/artists');
      expect(req.request.method).toBe('GET');
      req.flush(exampleArtists);
    });
  });

  describe('getArtistById', () => {
    it('should get the artist with the given id', () => {
      service.getArtistById(artist._id).subscribe((foundArtist) => {
        expect(foundArtist).toEqual(artist);

        expect(foundArtist._id).toEqual(artist._id);
        expect(foundArtist.name).toEqual(artist.name);
        expect(foundArtist.genre).toEqual(artist.genre);
        expect(foundArtist.birthDate).toEqual(artist.birthDate);
        expect(foundArtist.description).toEqual(artist.description);
        expect(foundArtist.artistImage).toEqual(artist.artistImage);
        expect(foundArtist.artistHeader).toEqual(artist.artistHeader);
        expect(foundArtist.creatorId).toEqual(artist.creatorId);
      });

      const req = httpMock.expectOne(
        `http://localhost:3333/api/artists/${artist._id}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(artist);
    });
  });

  describe('createArtist', () => {
    it('should create the artist', () => {
      const createdArtist: Artist = {
        _id: new Types.ObjectId(),
        name: 'Test Test',
        birthDate: new Date('1990-01-01'),
        artistImage: 'https://example.com/image.jpg',
        artistHeader: 'https://example.com/header.jpg',
        genre: 'Pop',
        description: 'Test Test is a famous pop artist.',
        creatorId: new Types.ObjectId(),
      };

      service.createArtist(createdArtist).subscribe((artist) => {
        expect(artist).toEqual(createdArtist);

        expect(createdArtist._id).toEqual(artist._id);
        expect(createdArtist.name).toEqual(artist.name);
        expect(createdArtist.genre).toEqual(artist.genre);
        expect(createdArtist.birthDate).toEqual(artist.birthDate);
        expect(createdArtist.description).toEqual(artist.description);
        expect(createdArtist.artistImage).toEqual(artist.artistImage);
        expect(createdArtist.artistHeader).toEqual(artist.artistHeader);
        expect(createdArtist.creatorId).toEqual(artist.creatorId);
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/artists`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        name: createdArtist.name,
        birthDate: createdArtist.birthDate,
        artistImage: createdArtist.artistImage,
        artistHeader: createdArtist.artistHeader,
        genre: createdArtist.genre,
        description: createdArtist.description,
        creatorId: createdArtist.creatorId,
      });
      req.flush(createdArtist);
    });
  });

  describe('updateArtist', () => {
    it('should update the artist', () => {
      const updatedArtist: Partial<Artist> = {
        name: 'New John',
      };

      service.updateArtist(artist._id, updatedArtist).subscribe((returnedArtist) => {
        expect(returnedArtist).toEqual(updatedArtist);
        expect(returnedArtist.name).toEqual(updatedArtist.name);
        expect(returnedArtist.birthDate).toEqual(artist.birthDate);
        expect(returnedArtist.artistImage).toEqual(artist.artistImage);
        expect(returnedArtist.artistHeader).toEqual(artist.artistHeader);
        expect(returnedArtist.genre).toEqual(artist.genre);
        expect(returnedArtist.description).toEqual(artist.description);
        expect(returnedArtist.creatorId).toEqual(artist.creatorId);
      });

      const req = httpMock.expectOne(`http://localhost:3333/api/artists/${artist._id}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({
        name: updatedArtist.name,
      });
      req.flush(updatedArtist);
    });
  });

  describe('deleteArtist', () => {
    it('should delete the artist with the given id', () => {
      service.deleteArtist(artist2._id).subscribe();

      const req = httpMock.expectOne(`http://localhost:3333/api/artists/${artist2._id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});

    });
  });
  
});
