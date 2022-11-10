import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { QueuesService } from './services';
import { BullQueues, BULL_OPTIONS, DEFAULT_JOB_OPTIONS } from './utils/options';

@Module({
  imports: [
    BullModule.forRoot(BULL_OPTIONS),
    BullModule.registerQueue({
      name: BullQueues.ORDER_NOTIFICATION,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    }),
  ],
  providers: [QueuesService],
})
export class QueuesModule {}
