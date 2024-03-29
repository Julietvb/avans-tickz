import {Types} from "mongoose";
import { Artist } from "../../artist/artist.schema";
import { Ticket } from "../../ticket/ticket.schema";
import { User } from "../user.schema";

export class UpdateUserDto{
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string;
    following: Types.ObjectId[];
    favoriteArtists: Artist[];
    myTickets: Ticket[];
}