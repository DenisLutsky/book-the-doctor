import { Injectable, Logger } from '@nestjs/common';
import { RolesEnum } from '@shared/enums';

import { UsersService } from 'src/modules/users/services';
import { IAuth, ILogin, IRegister } from '../interfaces';
import { generateJWT, hashPassword } from '../utils';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  public constructor(private readonly usersService: UsersService) {}

  public async signUp(input: IRegister): Promise<IAuth> {
    this.logger.log(`Registering new user`, { input });

    const { email, firstName, lastName, password, phone, photoUrl } = input;

    const hashedPassword = await hashPassword(password);

    const createdUser = await this.usersService.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phone,
      photo: {
        url: photoUrl,
      },
    });

    return {
      auth_token: generateJWT(email, createdUser.role),
    };
  }

  public async signIn(input: ILogin): Promise<IAuth> {
    this.logger.log(`Logging in a user`, { input });

    const existingUser = await this.usersService.findOneWithFilter({ email: input.email });

    return {
      auth_token: generateJWT(input.email, existingUser.role),
    };
  }

  public async checkUserRole(email: string, rolesToCheck: RolesEnum[]): Promise<boolean> {
    this.logger.log(`Checking user role`, { email, rolesToCheck });

    const { role } = await this.usersService.findOneWithFilter({ email });

    if (!role) {
      return false;
    }

    if (!rolesToCheck.length) {
      return true;
    }

    return rolesToCheck.includes(role);
  }
}
