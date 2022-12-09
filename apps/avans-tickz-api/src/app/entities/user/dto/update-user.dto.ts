import {Types} from "mongoose";
import { Artist } from "../../artist/artist.schema";
import { User } from "../user.schema";

export class UpdateUserDto{
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string;
    following: User[];
    favoriteArtists: Artist[];
}