import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { NotificationsService } from '@shared/modules/notifications/services';
import { BullQueues } from '../utils/options';
import { INotificationQueueMessage } from '../interfaces';

@Processor(BullQueues.ORDER_NOTIFICATION)
export class AppointmentNotificationConsumer {
  private readonly logger = new Logger(AppointmentNotificationConsumer.name);

  public constructor(private readonly notificationsService: NotificationsService) {}

  @Process()
  public async process(job: Job<INotificationQueueMessage>): Promise<void> {
    this.logger.log(`Processing started`, { jobId: job.id, data: job.data });

    await this.notificationsService.sendReminder(job.data);
  }
}
