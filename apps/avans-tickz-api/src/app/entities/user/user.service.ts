import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";
import { User } from "./user.schema";
import { Types} from 'mongoose';
@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository){}

    getUserById(userId: string): Promise<User>{
        console.log('service getById aangeroepen');
        return this.userRepository.findById(userId)
    }

    getAllUsers(): Promise<User[]>{
        return this.userRepository.find({})
    }

    createUser(_id: Types.ObjectId, firstName: string, lastName: string, birthDate: Date, emailAdres: string, password: string): Promise<User>{
        return this.userRepository.create({
            _id,
            firstName,
            lastName,
            birthDate,
            emailAdres,
            password,
            favoriteArtists: []
        })
    }

    updateUser(userId: Types.ObjectId, userUpdates: UpdateUserDto): Promise<User> {
        return this.userRepository.findOneAndUpdate({ _id: userId }, userUpdates)
    }
}