import { Venue } from "../venue/venue.schema";
import { Prop, Schema } from "@nestjs/mongoose";
import {Types} from "mongoose";
import { Artist } from "../artist/artist.schema";
import { Ticket } from "../ticket/ticket.schema";

@Schema()
export class Concert{
    @Prop()
    _id: Types.ObjectId;
    @Prop()
    title: string;
    @Prop()
    date: Date;
    @Prop()
    time: string;
    @Prop()
    amountOfTickets: Number;
    @Prop()
    artists: Artist;
    @Prop([Ticket])
    tickets: Ticket[];
    @Prop()
    venue: Venue;
}