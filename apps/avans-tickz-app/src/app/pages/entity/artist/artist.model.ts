import {Types} from "mongoose";

export interface Artist{
    _id: Types.ObjectId;
    name: string;
    birthDate: Date;
    genre: string;
    description: string;
    artistImage: string;
    artistHeader: string;
}