import {
  Body,
  Controller,
  Delete,
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
    return await this.concertService.getConcertById(concertId);
  }

  @Get('/name/:name')
  async getConcertByName(@Param('name') name: string): Promise<Concert> {
    return await this.concertService.getConcertByName(name);
  }

  @Get()
  async getConcerts(): Promise<Concert[]> {
    return this.concertService.getAllConcerts();
  }

  @Post()
  async createConcert(
    @Body() createConcertDto: CreateConcertDto
  ): Promise<Concert> {
    console.log("controller aangeroepen")
    return this.concertService.createConcert(
      createConcertDto.title,
      createConcertDto.date,
      createConcertDto.time,
      createConcertDto.amountOfTickets,
      createConcertDto.artist,
      createConcertDto.tickets,
      createConcertDto.ticketPrice,
      createConcertDto.ticketType,
      createConcertDto.venue,
      createConcertDto.creatorId
    );
  }

  @Patch(':concertId')
  async updateConcert(
    @Param('concertId') concertId: Types.ObjectId,
    @Body() updateConcertDto: UpdateConcertDto
  ): Promise<Concert> {
    return this.concertService.updateConcert(concertId, updateConcertDto);
  }

  @Delete(':concertId')
  async deleteConcert(@Param('concertId') concertId: string){
      console.log('deleteConcert aangeroepen')
      return await this.concertService.deleteConcertById(concertId);
  }
}
