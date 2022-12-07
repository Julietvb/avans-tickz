import { Injectable } from '@nestjs/common';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ConcertRepository } from './concert.repository';
import { Concert } from './concert.schema';
import { Types } from 'mongoose';
import { Artist } from '../artist/artist.schema';
import { Ticket } from '../ticket/ticket.schema';
import { Venue } from '../venue/venue.schema';
@Injectable()
export class ConcertService {
  constructor(private readonly concertRepository: ConcertRepository) {}

  getConcertById(concertId: string): Promise<Concert> {
    console.log('service getById aangeroepen');
    return this.concertRepository.findById(concertId);
  }

  getAllConcerts(): Promise<Concert[]> {
    return this.concertRepository.find({});
  }

  createConcert(
    title: string,
    date: Date,
    time: string,
    amountOfTickets: Number,
    performances: Map<string, string>,
    artists: string[],
    performTimes: string[],
    tickets: Ticket[],
    ticketPrice: Number,
    ticketType: string,
    venue: Venue,
  ): Promise<Concert> {

    for (let i = 0; i < amountOfTickets; i++) {
      tickets.push({
        _id: new Types.ObjectId(i),
        price: ticketPrice,
        type: ticketType,
        concertName: title
      });
    }

    let artistString = artists.toString()
    let artistArray = artistString.split(" / ")

    let performTimesString = performTimes.toString()
    let timesArray = performTimesString.split(" / ")

    if (artistArray.length == 1) {
      timesArray[0] = time;
    }
    
    performances = new Map<string, string>();
    for (let j = 0; j < artistArray.length; j++) {
        performances.set(artistArray.at(j), timesArray.at(j))
    }

    return this.concertRepository.create({
      title,
      date,
      time,
      amountOfTickets,
      performances: performances,
      tickets: tickets,
      venue
    });
  }

  updateConcert(
    concertId: Types.ObjectId,
    concertUpdates: UpdateConcertDto
  ): Promise<Concert> {
    return this.concertRepository.findOneAndUpdate(
      { _id: concertId },
      concertUpdates
    );
  }

  deleteConcertById(concertId: string){
    return this.concertRepository.deleteById(concertId);
}
}