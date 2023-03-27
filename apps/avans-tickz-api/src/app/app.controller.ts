import { Controller, Get, Request, Post, UseGuards, Param } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Types } from 'mongoose';
import { ArtistService } from './entities/artist/artist.service';
import { Artist } from './entities/artist/artist.schema';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private artistService: ArtistService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('reccommendations')
  async getReccommendations(@Request() req){
    const results = new Array<Artist>()
    const recs =  await this.appService.getReccommendations(new Types.ObjectId(req.user._id))
    
    for (const rec of recs){
      const artist = await this.artistService.getArtistById(rec);
      results.push(artist);
    }

    return results;
  }
  
  @Get()
  async getData(): Promise<string> {
    const greeting = await this.appService.getData();
    return greeting;
  }
}
