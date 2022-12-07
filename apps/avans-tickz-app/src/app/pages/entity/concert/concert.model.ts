import { Venue } from "../venue/venue.model";
import { Types } from "mongoose";
import { Ticket } from "../ticket/ticket.model";


export interface Concert{
    _id: Types.ObjectId;
    concertId: Number;
    title: string;
    date: Date;
    time: string;
    artists: string[],
    performTimes: string[],
    performances: Map<string, string>
    ticketPrice: Number,
    ticketType: string,
    tickets: Ticket[],
    amountOfTickets: Number;
    venue: Venue;
}