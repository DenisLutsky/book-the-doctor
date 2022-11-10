import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  public email!: string;

  @IsOptional()
  public password!: string;

  @IsOptional()
  public firstName!: string;

  @IsOptional()
  public lastName!: string;
}
