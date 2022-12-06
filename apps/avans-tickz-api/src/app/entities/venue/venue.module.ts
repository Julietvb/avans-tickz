import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VenueController } from "./venue.controller";
import { VenueRepository } from "./venue.repository";
import { Venue, VenueSchema } from "./venue.schema";
import { VenueService } from "./venue.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Venue.name, schema: VenueSchema}])],
    controllers: [VenueController],
    providers: [VenueService, VenueRepository]
})

export class VenueModule{}