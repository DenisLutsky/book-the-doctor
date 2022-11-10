import { Injectable, OnModuleInit } from '@nestjs/common';
import { appConfig } from 'src/configs';

import { hashPassword } from '@core/auth/utils';
import { UserRepository } from '@shared/modules/repositories';
import { RolesEnum } from '@shared/enums';
import { UsersService } from './users.service';

@Injectable()
export class AdminInitializationService implements OnModuleInit {
  public constructor(private usersService: UsersService, private userRepository: UserRepository) {}

  public async onModuleInit(): Promise<void> {
    const { email, password } = appConfig.admin;

    const existedAdmin = await this.usersService.findOneWithFilter({ email }, true);

    if (existedAdmin) {
      return;
    }

    const hashedPassword = await hashPassword(password);

    const role = RolesEnum.ADMIN;

    await this.userRepository.create({
      email,
      firstName: 'admin',
      lastName: 'admin',
      password: hashedPassword,
      role,
    });
  }
}
