import { Types } from "mongoose";
import { Artist } from "../artist/artist.model";
import { Ticket } from "../ticket/ticket.model";

export interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string; 
    favoriteArtists: Artist[];
    myTickets: Ticket[];
    following: Types.ObjectId[];
    access_token: '';
}