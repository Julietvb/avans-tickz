import { Injectable, Dependencies } from '@nestjs/common';
import { UserService } from '../entities/user/user.service';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { emailAdres: user.emailAdres, sub: user._id, firstName: user.firstName, lastName: user.lastName, birthDate: user.birthDate };
    // console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}