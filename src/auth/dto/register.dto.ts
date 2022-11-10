import { IsDefined } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto';

export class RegisterDto extends CreateUserDto {
  @IsDefined()
  public email!: string;

  @IsDefined()
  public password!: string;

  @IsDefined()
  public firstName!: string;

  @IsDefined()
  public lastName!: string;
}
