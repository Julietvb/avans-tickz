import { Artist } from "../../artist/artist.schema";
import { Ticket } from "../../ticket/ticket.schema";
import { Venue } from "../../venue/venue.schema";

import {Types} from "mongoose";


export class UpdateConcertDto{
    title: string;
    date: Date;
    time: string;
    amountOfTickets: Number;
    artist: Artist;
    tickets: Ticket[];
    ticketPrice: Number;
    ticketType: string;
    venue: Venue;
}