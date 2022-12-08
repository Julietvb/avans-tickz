import { Venue } from "../venue/venue.model";
import { Types } from "mongoose";
import { Ticket } from "../ticket/ticket.model";
import { Artist } from "../artist/artist.model";


export interface Concert{
    _id: Types.ObjectId;
    concertId: Number;
    title: string;
    date: Date;
    time: string;
    artist: Artist,
    ticketPrice: Number,
    ticketType: Number,
    tickets: Ticket[],
    amountOfTickets: Number;
    venue: Venue;
    creatorId: Types.ObjectId;
}