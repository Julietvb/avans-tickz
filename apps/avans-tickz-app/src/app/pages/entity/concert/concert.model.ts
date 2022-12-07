import { Venue } from "../venue/venue.model";
import { Types } from "mongoose";


export interface Concert{
    _id: Types.ObjectId;
    concertId: Number;
    title: string;
    date: Date;
    time: string;
    artists: string[],
    performTimes: string[],
    ticketPrice: Number,
    ticketType: Number,
    amountOfTickets: Number;
    venue: Venue;
}