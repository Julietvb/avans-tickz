import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Neo4jModule } from "../neo4j/neo4j.module";
import { ArtistController } from "./artist.controller";
import { ArtistRepository } from "./artist.repository";
import { Artist, ArtistSchema } from "./artist.schema";
import { ArtistService } from "./artist.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}]),
    Neo4jModule.forRoot({
        scheme: 'neo4j',
        host: 'localhost',
        port: 7687,
        username: 'neo4j',
        password: 'neo'
      }), ],
    controllers: [ArtistController],
    providers: [ArtistService, ArtistRepository],
    exports: [ArtistService]
})

export class ArtistModule{}