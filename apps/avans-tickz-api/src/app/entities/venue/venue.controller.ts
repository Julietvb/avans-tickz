import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { CreateVenueDto } from './dto/create-venue.dto';
  import { UpdateVenueDto } from './dto/update-venue.dto';
  import { Venue } from './venue.schema';
  import { VenueService } from './venue.service';
  import { Types } from 'mongoose';
  
  @Controller('venues')
  export class VenueController {
    constructor(private readonly venueService: VenueService) {}
  
    @Get(':venueId')
    async getVenue(@Param('venueId') venueId: string): Promise<Venue> {
      console.log('getVenue aangeroepen');
      console.log(venueId);
      return await this.venueService.getVenueById(venueId);
    }
  
    @Get()
    async getVenues(): Promise<Venue[]> {
      return this.venueService.getAllVenues();
    }
  
    @Post()
    async createVenue(
      @Body() createVenueDto: CreateVenueDto
    ): Promise<Venue> {
      return this.venueService.createVenue(
        createVenueDto.venueName,
        createVenueDto.venueImage,
        createVenueDto.adres,
        createVenueDto.city,
        createVenueDto.capacity
      );
    }
  
    @Patch(':venueId')
    async updateVenue(
      @Param('venueId') venueId: Types.ObjectId,
      @Body() updateVenueDto: UpdateVenueDto
    ): Promise<Venue> {
      return this.venueService.updateVenue(venueId, updateVenueDto);
    }
  }
  