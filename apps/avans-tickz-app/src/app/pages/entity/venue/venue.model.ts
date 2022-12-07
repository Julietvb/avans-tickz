import {Types} from "mongoose";

export interface Venue{
    _id: Types.ObjectId;
    venueName: string;
    venueImage: string;
    adres: string;
    city: string;
    capacity: Number;
}