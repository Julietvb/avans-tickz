import {Types} from "mongoose";

export class UpdateUserDto{
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string;
}