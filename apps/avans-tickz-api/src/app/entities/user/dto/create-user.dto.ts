import {Types} from "mongoose";
import { User } from "../user.schema";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string;
    following: User[];
}