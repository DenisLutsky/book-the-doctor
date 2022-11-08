import { MongoServerError } from 'mongodb';

export interface MongoError extends MongoServerError {
  keyValue: Record<string, any>;
}
