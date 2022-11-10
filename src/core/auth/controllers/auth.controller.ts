import { Controller, Post, Body } from '@nestjs/common';

import { LoginDto, RegisterDto } from '../dto';
import { IAuth } from '../interfaces';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() input: RegisterDto): Promise<IAuth> {
    return this.authService.signUp(input);
  }

  @Post('login')
  public async login(@Body() input: LoginDto): Promise<IAuth> {
    return this.authService.signIn(input);
  }
}
