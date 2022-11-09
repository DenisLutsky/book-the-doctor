import { Module } from '@nestjs/common';

import { RepositoriesModule } from '@shared/modules';
import { DoctorsController, UsersController } from './controllers';
import { UsersService } from './services';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [RepositoriesModule, AppointmentsModule],
  controllers: [UsersController, DoctorsController],
  providers: [UsersService],
})
export class UsersModule {}
