import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { AppointmentsService } from '@core/modules/appointments/services';
import { UsersService } from '@core/modules/users/services';
import { Appointment } from '@core/modules/appointments/schemas';
import { User } from '@core/modules/users/schemas';
import { INotificationQueueMessage } from '@shared/modules/queues/interfaces';
import { NotificationsAdapter } from '../adapters';

@Injectable()
export class NotificationsService {
  public constructor(
    private readonly notificationsAdapter: NotificationsAdapter,
    private readonly appointmentsService: AppointmentsService,
    private readonly usersService: UsersService,
  ) {}

  public async sendReminder(data: INotificationQueueMessage): Promise<void> {
    const appointment = await this.appointmentsService.findOneWithFilter({ id: data.appointmentId });
    const user = await this.usersService.findOneById(appointment.patient);
    const doctor = await this.usersService.findOneById(appointment.doctor);

    const letter = this.buildLetter(data.order, appointment, user, doctor);
    await this.notificationsAdapter.notify(user.email, letter);
  }

  private buildLetter(order: 'first' | 'second', appointment: Appointment, user: User, doctor: User): string {
    let letter: string;

    if (order === 'first') {
      letter = `
      <div>
        <p>${moment().format('HH:mm DD/MM/YYY')} Hello ${user.firstName} ${user.lastName}!</p>
        <p>Reminding you that you have an appointment with doctor ${doctor.firstName} ${doctor.lastName} 
        tomorrow at ${moment(appointment.date).format('HH:mm DD/MM/YYY')}}!
        </p>
      </div>
      `;
    } else {
      letter = `
      <div>
        <p>${moment().format('HH:mm DD/MM/YYY')} Hello ${user.firstName} ${user.lastName}!</p>
        <p>Reminding you that you have an appointment with doctor ${doctor.firstName} ${doctor.lastName} 
        in two hours at ${moment(appointment.date).format('HH:mm DD/MM/YYY')}}!
        </p>
      </div>`;
    }

    return letter;
  }
}
