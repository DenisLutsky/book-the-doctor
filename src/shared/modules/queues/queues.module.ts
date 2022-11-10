import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { BullQueues, BULL_OPTIONS, DEFAULT_JOB_OPTIONS } from './utils/options';
import { QueuesService } from './services';
import { AppointmentNotificationConsumer } from './consumers';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    BullModule.forRoot(BULL_OPTIONS),
    BullModule.registerQueue({
      name: BullQueues.ORDER_NOTIFICATION,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    }),
    NotificationsModule,
  ],
  providers: [QueuesService, AppointmentNotificationConsumer],
  exports: [QueuesService],
})
export class QueuesModule {}
