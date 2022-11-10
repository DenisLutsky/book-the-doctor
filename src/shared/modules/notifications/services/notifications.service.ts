import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  public async sendReminder(createNotificationDto: any): Promise<any> {
    return 'This action adds a new notification';
  }
}
