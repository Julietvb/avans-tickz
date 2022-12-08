import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import {Types} from "mongoose";

@Injectable()
export class UserRepository{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findById(userId: string): Promise<User> {
        console.log('repository findById aangeroepen')
        return await this.userModel.findOne({_id: new Types.ObjectId(userId)})
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({emailAdres: email});
      }    

    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return await this.userModel.find(usersFilterQuery)
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        return await this.userModel.findOneAndUpdate(userFilterQuery, user, {new: true});
    }

    async deleteById(userId: string){
        return await this.userModel.deleteOne({_id: new Types.ObjectId(userId)})
    }
}