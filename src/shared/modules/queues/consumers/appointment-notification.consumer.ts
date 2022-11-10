import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { NotificationsService } from '@shared/modules/notifications/services';
import { BullQueues } from '../utils/options';
import { NotificationQueueMessage } from '../interfaces';

@Processor(BullQueues.ORDER_NOTIFICATION)
export class OrderNotificationConsumer {
  private readonly logger = new Logger(OrderNotificationConsumer.name);

  public constructor(private readonly notificationsService: NotificationsService) {}

  @Process()
  public async process(job: Job<NotificationQueueMessage>): Promise<void> {
    this.logger.log(`Processing started`, { jobId: job.id, data: job.data });

    await this.notificationsService.sendReminder(job.data.appointmentId);
  }
}
