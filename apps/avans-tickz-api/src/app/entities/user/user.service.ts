import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";
import { User } from "./user.schema";
import { Types } from 'mongoose';

@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository){}

    async getUserById(userId: Types.ObjectId): Promise<User>{
        return this.userRepository.findById({ _id: new Types.ObjectId(userId) })
    }

    async getAllUsers(): Promise<User[]>{
        return this.userRepository.find({})
    }

    async createUser(firstName: string, lastName: string, birthDate: Date, emailAdres: string, password: string): Promise<User>{
        return this.userRepository.create({
            firstName,
            lastName,
            birthDate,
            emailAdres,
            password,
            favoriteArtists: []
        })
    }

    async updateUser(userId: Types.ObjectId, userUpdates: UpdateUserDto): Promise<User> {
        return this.userRepository.findOneAndUpdate({ _id: new Types.ObjectId(userId) }, userUpdates)
    }
}