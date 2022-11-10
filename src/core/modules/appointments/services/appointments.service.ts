import { Injectable, Logger } from '@nestjs/common';

import { AppointmentRepository } from '@shared/modules/repositories';
import { IAppointmentInput } from '../interfaces';
import { AppointmentDocument } from '../schemas';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  public constructor(private appointmentRepository: AppointmentRepository) {}

  public async create(input: IAppointmentInput): Promise<AppointmentDocument> {
    this.logger.log(`Creating new appointment`, { input });

    const { doctorId, patientId, date } = input;

    return await this.appointmentRepository.create({
      doctor: doctorId,
      patient: patientId,
      date: new Date(date),
    });
  }

  public async findAll(): Promise<AppointmentDocument[]> {
    this.logger.log(`Searching for all appointments`);

    return await this.appointmentRepository.findMany({});
  }

  public async findManyWithFilter(doctorId: string): Promise<AppointmentDocument[]> {
    this.logger.log(`Searching for appointments with filter`, { doctorId });

    return await this.appointmentRepository.findMany({
      doctor: doctorId,
      isActive: false,
      isDeleted: false,
    });
  }

  public async findOne(id: string): Promise<AppointmentDocument> {
    this.logger.log(`Searching for appointment with id: ${id}`);

    return await this.appointmentRepository.findOneById(id);
  }

  //  const delay = moment(notification.notificationDate).diff(moment(), 'millisecond');
  //  await this.queueService.enqueueOrderNotification(notification.orderNotificationId, delay);
  // TODO: add approve | reject services

  public async update(id: string, input: Partial<IAppointmentInput>): Promise<AppointmentDocument> {
    this.logger.log(`Updating for appointment with id: ${id}`, { id, input });

    const { doctorId, patientId, date } = input;

    return await this.appointmentRepository.updateOne(id, {
      ...input,
      date: date ? new Date() : undefined,
      doctor: doctorId,
      patient: patientId,
    });
  }

  public async remove(id: string): Promise<boolean> {
    this.logger.log(`Deleting appointment with id: ${id}`);

    return await this.appointmentRepository.delete(id);
  }
}
