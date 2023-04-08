import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Artist, ArtistDocument } from "./artist.schema";
import {Types} from "mongoose";
import { Neo4jService } from "../neo4j/neo4j.service";

@Injectable()
export class ArtistRepository{
    constructor(@InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    private readonly neo4jService: Neo4jService
    ) {}

    async findById(artistId: string): Promise<Artist> {
        return await this.artistModel.findOne({_id: new Types.ObjectId(artistId)})
    }

    async find(artistFilterQuery: FilterQuery<Artist>): Promise<Artist[]> {
        return await this.artistModel.find(artistFilterQuery)
    }

    async create(artist: Artist): Promise<Artist> {
        const newArtist = await new this.artistModel(artist).save()

        const artistNeo = await this.neo4jService.write(
            `CREATE (:Artist {id: '${newArtist._id}'})`
          );
        
        return newArtist
    }

    async findOneAndUpdate(artistFilterQuery: FilterQuery<Artist>, artist: Partial<Artist>): Promise<Artist> {
        return await this.artistModel.findOneAndUpdate(artistFilterQuery, artist, {new: true});
    }

    async deleteById(artistId: string){
        return await this.artistModel.deleteOne({_id: new Types.ObjectId(artistId)})
    }
}