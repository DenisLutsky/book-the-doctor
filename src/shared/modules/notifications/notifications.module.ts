import { Module } from '@nestjs/common';

import { NotificationsService } from './services';
import { NotificationsAdapter } from './adapters';

@Module({
  providers: [NotificationsService, NotificationsAdapter],
})
export class NotificationsModule {}
