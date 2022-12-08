import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './entities/user/user.module';
import { ConcertModule } from './entities/concert/concert.module';
import { VenueModule } from './entities/venue/venue.module';
import { ArtistModule } from './entities/artist/artist.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/avansTickz'), UserModule, ConcertModule, VenueModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
