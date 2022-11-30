import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";
import { User } from "./user.schema";

@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository){}

    async getUserById(userId: Number): Promise<User>{
        return this.userRepository.findById({userId})
    }

    async getAllUsers(): Promise<User[]>{
        return this.userRepository.find({})
    }

    async createUser(firstName: string, lastName: string, birthDate: Date, emailAdres: string, password: string): Promise<User>{
        return this.userRepository.create({
            userId: 1,
            firstName,
            lastName,
            birthDate,
            emailAdres,
            password,
            favoriteArtists: []
        })
    }

    async updateUser(userId: Number, userUpdates: UpdateUserDto): Promise<User> {
        return this.userRepository.findOneAndUpdate({userId}, userUpdates)
    }
}