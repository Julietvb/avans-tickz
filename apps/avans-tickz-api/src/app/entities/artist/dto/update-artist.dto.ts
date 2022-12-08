import {Types} from "mongoose";

export class UpdateArtistDto {
    name: string;
    birthDate: Date;
    genre: string;
    description: string;
    creatorId: Types.ObjectId
    artistImage: string;
    artistHeader: string;

}