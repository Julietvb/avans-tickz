import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { Concert } from './concert.schema';
import { ConcertService } from './concert.service';
import { Types } from 'mongoose';

@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get(':concertId')
  async getConcert(@Param('concertId') concertId: string): Promise<Concert> {
    console.log('getConcert aangeroepen');
    console.log(concertId);
    return await this.concertService.getConcertById(concertId);
  }

  @Get()
  async getConcerts(): Promise<Concert[]> {
    return this.concertService.getAllConcerts();
  }

  @Post()
  async createConcert(
    @Body() createConcertDto: CreateConcertDto
  ): Promise<Concert> {
    return this.concertService.createConcert(
      createConcertDto.title,
      createConcertDto.date,
      createConcertDto.time,
      createConcertDto.amountOfTickets,
      createConcertDto.performances,
      createConcertDto.artists,
      createConcertDto.performTimes,
      createConcertDto.tickets,
      createConcertDto.ticketPrice,
      createConcertDto.ticketType,
      createConcertDto.venueId
    );
  }

  @Patch(':concertId')
  async updateConcert(
    @Param('concertId') concertId: Types.ObjectId,
    @Body() updateConcertDto: UpdateConcertDto
  ): Promise<Concert> {
    return this.concertService.updateConcert(concertId, updateConcertDto);
  }
}
