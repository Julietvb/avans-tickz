import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUserById(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  getUserByEmail(emailAdres: string): Promise<User> {
    return this.userRepository.findByEmail(emailAdres);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  createUser(
    firstName: string,
    lastName: string,
    birthDate: Date,
    emailAdres: string,
    password: string
  ): Promise<User> {
    return this.userRepository.create({
      firstName,
      lastName,
      birthDate,
      emailAdres,
      password,
      favoriteArtists: [],
      myTickets: [],
      following: [],
    });
  }

  async updateUser(
    userId: Types.ObjectId,
    userUpdates: UpdateUserDto
  ): Promise<User> {
    let user = await this.userRepository.findById(userId.toString());

    if (userUpdates.favoriteArtists == undefined) {
      userUpdates.favoriteArtists = [];
      user.favoriteArtists.forEach((artist) => {
        userUpdates.favoriteArtists.push(artist);
      }) 
    }

    if (userUpdates.myTickets == undefined) {
      userUpdates.myTickets = [];
      user.myTickets.forEach((ticket) => {
        userUpdates.myTickets.push(ticket);
      }) 
    }
    return this.userRepository.findOneAndUpdate({ _id: userId }, userUpdates);
  }

  deleteUserById(userId: string) {
    return this.userRepository.deleteById(userId);
  }

  async follow(userId: Types.ObjectId, followUserId: Types.ObjectId): Promise<User[]> {

    const user = await this.userRepository.follow(userId, followUserId);

    return [user]
  }
}
