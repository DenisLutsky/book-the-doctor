import { JobOptions, QueueOptions } from 'bull';

export const BULL_OPTIONS: QueueOptions = {
  redis: {
    host: 'localhost',
    port: 6379,
  },
};

export const DEFAULT_JOB_OPTIONS: JobOptions = {
  removeOnComplete: true,
  attempts: 2,
};

export const enum BullQueues {
  ORDER_NOTIFICATION = 'ORDER_NOTIFICATION',
}
