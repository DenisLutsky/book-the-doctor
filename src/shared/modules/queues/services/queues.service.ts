import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { BullQueues } from '../utils/options';
import { INotificationQueueMessage } from '../interfaces';

@Injectable()
export class QueuesService {
  private readonly logger = new Logger(QueuesService.name);

  public constructor(
    @InjectQueue(BullQueues.ORDER_NOTIFICATION)
    private readonly notificationQueue: Queue<INotificationQueueMessage>,
  ) {}

  public async enqueueAppointmentNotification(data: INotificationQueueMessage, delay: number): Promise<void> {
    this.logger.log(`Enqueueing appointment notification`, { data, delay });

    await this.notificationQueue.add(data, { delay });
  }
}
