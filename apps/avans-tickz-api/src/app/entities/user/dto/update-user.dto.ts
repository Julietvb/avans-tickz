import {Types} from "mongoose";
import { User } from "../user.schema";

export class UpdateUserDto{
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string;
    following: User[];
}