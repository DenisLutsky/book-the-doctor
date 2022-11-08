import { Module } from '@nestjs/common';

import { RepositoriesModule } from '@shared/modules';
import { UsersController } from './controllers';
import { UsersService } from './services';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
