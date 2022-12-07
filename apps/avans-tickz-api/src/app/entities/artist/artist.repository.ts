import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Artist, ArtistDocument } from "./artist.schema";
import {Types} from "mongoose";

@Injectable()
export class ArtistRepository{
    constructor(@InjectModel(Artist.name) private artistModel: Model<ArtistDocument>) {}

    async findById(artistId: string): Promise<Artist> {
        return await this.artistModel.findOne({_id: new Types.ObjectId(artistId)})
    }

    async find(artistFilterQuery: FilterQuery<Artist>): Promise<Artist[]> {
        return await this.artistModel.find(artistFilterQuery)
    }

    async create(artist: Artist): Promise<Artist> {
        const newArtist = new this.artistModel(artist);
        return await newArtist.save()
    }

    async findOneAndUpdate(artistFilterQuery: FilterQuery<Artist>, artist: Partial<Artist>): Promise<Artist> {
        return await this.artistModel.findOneAndUpdate(artistFilterQuery, artist, {new: true});
    }

    async deleteById(artistId: string){
        return await this.artistModel.deleteOne({_id: new Types.ObjectId(artistId)})
    }
}