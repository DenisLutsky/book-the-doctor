import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class NotificationsAdapter {
  public async notify(email: string, letter: string): Promise<void> {
    fs.writeFile('email.log', `email: ${email}, body: ${letter}`, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Delivered`);
    });
  }
}
