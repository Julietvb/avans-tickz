import { Injectable } from '@nestjs/common';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { Artist } from './artist.schema';
import { Types } from 'mongoose';
@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  getArtistById(artistId: string): Promise<Artist> {
    console.log('service getById aangeroepen');
    return this.artistRepository.findById(artistId);
  }

  getAllArtists(): Promise<Artist[]> {
    return this.artistRepository.find({});
  }

  createArtist(
    name: string,
    birthDate: Date,
    genre: string,
    description: string,
    artistImage: string,
    artistHeader: string,
    creatorId: Types.ObjectId
  ): Promise<Artist> {
    return this.artistRepository.create({
      name,
      birthDate,
      genre,
      description,
      artistImage,
      artistHeader,
      creatorId
    });
  }

  updateArtist(
    artistId: Types.ObjectId,
    artistUpdates: UpdateArtistDto
  ): Promise<Artist> {
    return this.artistRepository.findOneAndUpdate(
      { _id: artistId },
      artistUpdates
    );
  }

  deleteArtistById(artistId: string) {
    return this.artistRepository.deleteById(artistId);
  }
}
