import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArtistController } from "./artist.controller";
import { ArtistRepository } from "./artist.repository";
import { Artist, ArtistSchema } from "./artist.schema";
import { ArtistService } from "./artist.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}])],
    controllers: [ArtistController],
    providers: [ArtistService, ArtistRepository],
    exports: [ArtistRepository]
})

export class ArtistModule{}