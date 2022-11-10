import { Module } from '@nestjs/common';

import { RepositoriesModule } from '@shared/modules';
import { DoctorsController, UsersController } from './controllers';
import { UsersService } from './services';
import { AppointmentsModule } from '../appointments/appointments.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [RepositoriesModule, AppointmentsModule, AuthModule],
  controllers: [UsersController, DoctorsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
