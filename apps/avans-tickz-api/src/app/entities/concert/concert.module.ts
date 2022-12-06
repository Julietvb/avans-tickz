import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConcertController } from "./concert.controller";
import { ConcertRepository } from "./concert.repository";
import { Concert, ConcertSchema } from "./concert.schema";
import { ConcertService } from "./concert.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Concert.name, schema: ConcertSchema}])],
    controllers: [ConcertController],
    providers: [ConcertService, ConcertRepository]
})

export class ConcertModule{}