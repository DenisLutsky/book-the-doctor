import { Module } from '@nestjs/common';

import { AuthModule } from '@core/auth/auth.module';
import { QueuesModule, RepositoriesModule } from '@shared/modules';
import { AppointmentsController } from './controllers';
import { AppointmentsService } from './services';

@Module({
  imports: [RepositoriesModule, AuthModule, QueuesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
