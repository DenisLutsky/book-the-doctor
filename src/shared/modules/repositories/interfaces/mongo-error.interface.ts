import { MongoServerError } from 'mongodb';

export interface IMongoError extends MongoServerError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyValue: Record<string, any>;
}
