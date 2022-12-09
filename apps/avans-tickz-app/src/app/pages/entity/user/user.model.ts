import { Types } from "mongoose";

export interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string; 
    favoriteArtists: string[];
    following: User[];
    access_token: '';
}