// src/auth/guards/permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(ctx: ExecutionContext): boolean {
        const required = this.reflector.get<string[]>(PERMISSIONS_KEY, ctx.getHandler());
        if (!required) return true;
        const { user } = ctx.switchToHttp().getRequest();
        console.log(user);
        return required.every((perm) => user.permissions.includes(perm));
    }
}
