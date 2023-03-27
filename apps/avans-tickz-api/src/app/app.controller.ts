import { Controller, Get, Request, Post, UseGuards, Param } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Types } from 'mongoose';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

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
  getReccommendations(@Request() req){
    return this.appService.getReccommendations(new Types.ObjectId(req.user._id));
  }
  
  @Get()
  async getData(): Promise<string> {
    const greeting = await this.appService.getData();
    return greeting;
  }
}
