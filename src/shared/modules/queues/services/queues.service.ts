import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { BullQueues } from '../utils/options';
import { NotificationQueueMessage } from '../interfaces';

@Injectable()
export class QueuesService {
  private readonly logger = new Logger(QueuesService.name);

  public constructor(
    @InjectQueue(BullQueues.ORDER_NOTIFICATION)
    private readonly notificationQueue: Queue<NotificationQueueMessage>,
  ) {}

  public async enqueueAppointmentNotification(appointmentId: string, delay: number): Promise<void> {
    this.logger.debug(`Enqueueing appointment notification`, { appointmentId, delay });

    await this.notificationQueue.add(
      {
        appointmentId,
      },
      {
        delay,
      },
    );
  }
}
