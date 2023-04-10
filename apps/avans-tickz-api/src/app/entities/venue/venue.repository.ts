import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Venue, VenueDocument } from "./venue.schema";
import {Types} from "mongoose";

@Injectable()
export class VenueRepository{
    constructor(@InjectModel(Venue.name) private venueModel: Model<VenueDocument>) {}

    async findById(venueId: string): Promise<Venue> {
        // console.log('repository findById aangeroepen')
        return await this.venueModel.findOne({_id: new Types.ObjectId(venueId)})
    }

    async find(venueFilterQuery: FilterQuery<Venue>): Promise<Venue[]> {
        return await this.venueModel.find(venueFilterQuery)
    }

    async create(venue: Venue): Promise<Venue> {
        const newVenue = new this.venueModel(venue);
        return await newVenue.save()
    }

    async findOneAndUpdate(venueFilterQuery: FilterQuery<Venue>, venue: Partial<Venue>): Promise<Venue> {
        return await this.venueModel.findOneAndUpdate(venueFilterQuery, venue, {new: true});
    }
}