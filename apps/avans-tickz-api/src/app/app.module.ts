import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './entities/user/user.module';
import { ConcertModule } from './entities/concert/concert.module';
import { VenueModule } from './entities/venue/venue.module';
import { AuthModule } from './auth/auth.module';
import { ArtistModule } from './entities/artist/artist.module';
import { Neo4jModule } from './entities/neo4j/neo4j.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/avansTickz'), 
  Neo4jModule.forRoot({
    scheme: 'neo4j',
    host: 'localhost',
    port: 7687,
    username: 'neo4j',
    password: 'neo'
  }), 
  UserModule, ConcertModule, VenueModule, ArtistModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
