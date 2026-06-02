import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MGP_SECRET_KEY_DEV',
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    organisationId: string;
  }) {
    return {
      userId: payload.sub,
      email: payload.email,
      organisationId: payload.organisationId,
    };
  }
}