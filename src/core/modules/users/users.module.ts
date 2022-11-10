import { Module } from '@nestjs/common';

import { AuthModule } from '@core/auth/auth.module';
import { RepositoriesModule } from '@shared/modules';
import { AppointmentsModule } from '../appointments/appointments.module';
import { DoctorsController, UsersController } from './controllers';
import { AdminInitializationService, UsersService } from './services';

@Module({
  imports: [RepositoriesModule, AppointmentsModule, AuthModule],
  controllers: [UsersController, DoctorsController],
  providers: [UsersService, AdminInitializationService],
  exports: [UsersService],
})
export class UsersModule {}
