export interface INotificationQueueMessage {
  appointmentId: string;
  order: 'first' | 'second';
}
