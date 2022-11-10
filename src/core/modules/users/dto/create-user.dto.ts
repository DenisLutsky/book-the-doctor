import { IsString, MinLength } from 'class-validator';

import { Trim } from '@shared/decorators';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @Trim()
  @IsString()
  @MinLength(6)
  public password!: string;
}
