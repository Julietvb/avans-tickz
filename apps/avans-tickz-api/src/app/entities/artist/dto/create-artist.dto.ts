import {Types} from "mongoose";
export class CreateArtistDto {
    name: string;
    birthDate: Date;
    genre: string;
    description: string;
    creatorId: Types.ObjectId
}