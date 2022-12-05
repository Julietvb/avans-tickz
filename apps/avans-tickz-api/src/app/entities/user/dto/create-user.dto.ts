import {Types} from "mongoose";

export class CreateUserDto {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string;
}