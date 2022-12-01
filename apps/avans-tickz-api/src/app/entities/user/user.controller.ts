import { Body, Controller, Get, Param, Patch, Post, Type } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { Types } from 'mongoose';


@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get(':userId')
    async getUser(@Param('userId') userId: Types.ObjectId): Promise<User>{
        return this.userService.getUserById(userId);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto.firstName, createUserDto.lastName, createUserDto.birthDate, createUserDto.emailAdres, createUserDto.password);
    }

    @Patch(':userId')
    async updateUser(@Param('userId') userId: Types.ObjectId, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(userId, updateUserDto);
    }
}