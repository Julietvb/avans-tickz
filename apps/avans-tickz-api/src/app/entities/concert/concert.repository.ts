import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Concert, ConcertDocument } from "./concert.schema";
import {Types} from "mongoose";

@Injectable()
export class ConcertRepository{
    constructor(@InjectModel(Concert.name) private concertModel: Model<ConcertDocument>) {}

    async findById(concertId: string): Promise<Concert> {
        return await this.concertModel.findOne({_id: new Types.ObjectId(concertId)}).populate('venue')
    }

    async find(concertFilterQuery: FilterQuery<Concert>): Promise<Concert[]> {
        return await this.concertModel.find(concertFilterQuery).populate('venue')
    }

    async create(concert: Concert): Promise<Concert> {
        console.log(concert);
        const newConcert = new this.concertModel(concert);
        return await newConcert.save()
    }

    async findOneAndUpdate(concertFilterQuery: FilterQuery<Concert>, concert: Partial<Concert>): Promise<Concert> {
        return await this.concertModel.findOneAndUpdate(concertFilterQuery, concert, {new: true});
    }

    async deleteById(concertId: string){
        return await this.concertModel.deleteOne({_id: new Types.ObjectId(concertId)})
    }
}