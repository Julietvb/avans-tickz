import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    console.log(payload)
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken.toString())
    return { _id: payload.sub, emailAdres: payload.emailAdres, firstName: payload.firstName, lastName: payload.lastName, birthDate: payload.birthDate };
  }
}