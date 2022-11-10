import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsAdapter {
  public async notify(createNotificationDto: any): Promise<void> {
    // TODO: add logic for writing messages to file
  }
}
