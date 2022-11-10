import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { RolesEnum } from '@shared/enums';
import { ForbiddenException } from '@shared/exception';
import { IJwtPayload } from '../interfaces';
import { AuthService } from '../services';
import { validateToken } from '../utils';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const token = req?.headers.authorization;

    if (!token) return false;

    const payload = validateToken(token);

    return await this.checkRoles(context, payload);
  }

  private async checkRoles(context: ExecutionContext, tokenPayload: IJwtPayload): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const roleValid = await this.authService.checkUserRole(tokenPayload.email, requiredRoles);

    if (!roleValid) {
      throw new ForbiddenException('Not allowed');
    }

    return true;
  }
}
