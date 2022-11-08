import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { Trim } from '@shared/decorators';

export class UpdateUserDto extends CreateUserDto {
  // @Trim()
  // @IsEmail()
  // @IsNotEmpty()
  @IsOptional()
  public email!: string;

  // @Trim()
  // @IsString()
  // @MinLength(6)
  @IsOptional()
  public password!: string;

  // @Trim()
  // @IsString()
  // @MinLength(2)
  @IsOptional()
  public firstName!: string;

  // @Trim()
  // @IsString()
  // @MinLength(2)
  @IsOptional()
  public lastName!: string;
}
