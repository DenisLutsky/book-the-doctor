import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

import { Trim } from '@shared/decorators';
import { ILogin } from '../interfaces';

export class LoginDto implements ILogin {
  @Trim()
  @IsEmail()
  @IsDefined()
  public email!: string;

  @Trim()
  @IsString()
  @MinLength(6)
  @IsDefined()
  public password!: string;
}
