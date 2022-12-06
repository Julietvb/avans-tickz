import {Types} from "mongoose";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAdres: string;
    password: string;
}