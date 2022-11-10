import { forwardRef, Module } from '@nestjs/common';

import { NotificationsService } from './services';
import { NotificationsAdapter } from './adapters';
import { AppointmentsModule, UsersModule } from '@core/modules';

@Module({
  imports: [forwardRef(() => AppointmentsModule), forwardRef(() => UsersModule)],
  providers: [NotificationsService, NotificationsAdapter],
  exports: [NotificationsService],
})
export class NotificationsModule {}
