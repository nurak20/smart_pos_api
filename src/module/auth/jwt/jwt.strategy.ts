// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export interface JwtPayload {
    sub: string;
    roles: string[];
    permissions: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'secretKey',
        });
    }

    validate(payload: JwtPayload) {
        // This return value will be attached to req.user
        return { userId: payload.sub, roles: payload.roles, permissions: payload.permissions };
    }
}
