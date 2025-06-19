// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(ctx: ExecutionContext): boolean {
        const required = this.reflector.get<string[]>(ROLES_KEY, ctx.getHandler());
        if (!required) return true;
        const { user } = ctx.switchToHttp().getRequest();
        return user.roles.some((role: string) => required.includes(role));
    }
}
