import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';

import { QueuesService } from '@shared/modules/queues/services';
import { AppointmentRepository } from '@shared/modules/repositories';
import { IAppointmentInput } from '../interfaces';
import { Appointment, AppointmentDocument } from '../schemas';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  public constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly queuesService: QueuesService,
  ) {}

  public async create(input: IAppointmentInput): Promise<AppointmentDocument> {
    this.logger.log(`Creating new appointment`, { input });

    const { doctorId, patientId, date } = input;

    const appointmentDateTime = moment(date).format('DD-MM-YYYY HH:mm');

    if (appointmentDateTime === 'Invalid date') {
      throw new BadRequestException(`Please provide date in format "DD-MM-YYYY" and time "HH:mm"`);
    }

    const appointments = await this.appointmentRepository.findMany({
      date: {
        $gte: moment(date).toDate(),
        $lte: moment(date).add(1, 'day').toDate(),
      },
      doctor: doctorId,
      isActive: true,
      isDeleted: false,
    });

    if (appointments.length >= 3) {
      throw new ConflictException(`Sorry but doctor have to many active appointments in that day`);
    }

    return await this.appointmentRepository.create({
      doctor: doctorId,
      patient: patientId,
      date: new Date(appointmentDateTime),
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

  public async findOneById(id: string): Promise<AppointmentDocument> {
    this.logger.log(`Searching for appointment with id: ${id}`);

    return await this.appointmentRepository.findOneById(id);
  }

  public async findOneWithFilter(filter: Partial<Appointment & { id: string }>): Promise<AppointmentDocument> {
    this.logger.log(`Searching for appointment with filter`, { filter });

    return await this.appointmentRepository.findOne({ ...filter });
  }

  public async accept(id: string): Promise<boolean> {
    this.logger.log(`Accepting appointment with id: ${id}`);

    const appointment = await this.appointmentRepository.updateOne(id, { isActive: true });

    if (!appointment) {
      throw new Error(`Appointment with id: ${id} wasn't accepted`);
    }

    // TODO: prettify
    const dayBefore = moment(appointment.date).subtract(1, 'day').diff(moment(), 'millisecond');
    const twoHoursBefore = moment(appointment.date).subtract(2, 'h').diff(moment(), 'millisecond');
    await this.queuesService.enqueueAppointmentNotification(
      { appointmentId: appointment.id, order: 'first' },
      dayBefore,
    );
    await this.queuesService.enqueueAppointmentNotification(
      { appointmentId: appointment.id, order: 'second' },
      twoHoursBefore,
    );

    return true;
  }

  public async reject(id: string): Promise<boolean> {
    this.logger.log(`Rejecting appointment with id: ${id}`);

    return await this.remove(id);
  }

  // public async update(id: string, input: Partial<IAppointmentInput>): Promise<AppointmentDocument> {
  //   this.logger.log(`Updating for appointment with id: ${id}`, { id, input });

  //   const { doctorId, patientId, date } = input;

  //   return await this.appointmentRepository.updateOne(id, {
  //     ...input,
  //     date: date ? new Date() : undefined,
  //     doctor: doctorId,
  //     patient: patientId,
  //   });
  // }

  public async remove(id: string): Promise<boolean> {
    this.logger.log(`Deleting appointment with id: ${id}`);

    return await this.appointmentRepository.delete(id);
  }
}
