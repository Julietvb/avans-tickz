import { Injectable } from '@nestjs/common';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { VenueRepository } from './venue.repository';
import { Venue } from './venue.schema';
import { Types } from 'mongoose';
import { Artist } from '../artist/artist.schema';
import { Ticket } from '../ticket/ticket.schema';

@Injectable()
export class VenueService {
  constructor(private readonly venueRepository: VenueRepository) {}

  getVenueById(venueId: string): Promise<Venue> {
    // console.log('service getById aangeroepen');
    return this.venueRepository.findById(venueId);
  }

  getAllVenues(): Promise<Venue[]> {
    return this.venueRepository.find({});
  }

  createVenue(venueName: string, venueImage: string, adres: string, city: string, capacity: Number): Promise<Venue> {
    return this.venueRepository.create({
        venueName,
        venueImage,
        adres,
        city,
        capacity
    });
  }

  updateVenue(
    venueId: Types.ObjectId,
    venueUpdates: UpdateVenueDto
  ): Promise<Venue> {
    return this.venueRepository.findOneAndUpdate(
      { _id: venueId },
      venueUpdates
    );
  }
}
