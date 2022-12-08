import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { Artist } from "./artist.schema";
import { ArtistService } from "./artist.service";
import { Types } from 'mongoose';


@Controller('artists')
export class ArtistController{
    constructor(private readonly artistService: ArtistService){}

    @Get(':artistId')
    async getArtist(@Param('artistId') artistId: string): Promise<Artist>{
        return await this.artistService.getArtistById(artistId);
    }

    @Get()
    async getArtists(): Promise<Artist[]> {
        return this.artistService.getAllArtists();
    }

    @Post()
    async createArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
        return this.artistService.createArtist(createArtistDto.name, createArtistDto.birthDate, createArtistDto.genre, createArtistDto.description, createArtistDto.creatorId);
    }

    @Patch(':artistId')
    async updateArtist(@Param('artistId') artistId: Types.ObjectId, @Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
        return this.artistService.updateArtist(artistId, updateArtistDto);
    }

    @Delete(':artistId')
    async deleteArtist(@Param('artistId') artistId: string){
        console.log('deleteArtist aangeroepen')
        return await this.artistService.deleteArtistById(artistId);
    }
}