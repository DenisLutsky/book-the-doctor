import { Module } from '@nestjs/common';

import { RepositoriesModule } from '@shared/modules';
import { AppointmentsController } from './controllers';
import { AppointmentsService } from './services';

@Module({
  imports: [RepositoriesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
