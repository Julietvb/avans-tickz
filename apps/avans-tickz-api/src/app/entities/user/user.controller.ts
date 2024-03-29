import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';
import { Types } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    // console.log(email)
    return await this.userService.getUserByEmail(email);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.birthDate,
      createUserDto.emailAdres,
      createUserDto.password
    );
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: Types.ObjectId,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    // console.log('controller updates:')
    // console.log(updateUserDto.favoriteArtists)
    return this.userService.updateUser(userId, updateUserDto);
  }

  //Favorite
  @Post('/favorite/:id')
  async addToFavorite(
    @Body() loggedInUser,
    @Param('id') artistId: string
  ): Promise<User> {
    return this.userService.addToFavorite(loggedInUser._id, artistId);
  }

  @Post('/unfavorite/:id')
  async removeFromFavorite(
    @Body() loggedInUser,
    @Param('id') artistId: string
  ): Promise<User> {
    return this.userService.removeFromFavorite(loggedInUser._id, artistId);
  }

  //Follow
  @Post('/follow/:id')
  async follow(
    @Body() loggedInUser,
    @Param('id') followUserId: string
  ): Promise<User> {
    return this.userService.follow(loggedInUser._id, followUserId);
  }

  //Unfollow
  @Post('/unfollow/:id')
  async unfollow(
    @Body() loggedInUser,
    @Param('id') followUserId: string
  ): Promise<User> {
    return this.userService.unfollow(loggedInUser._id, followUserId);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    // console.log('deleteUser aangeroepen')
    return await this.userService.deleteUserById(userId);
  }
}
