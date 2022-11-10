import { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';

import { Appointment, AppointmentDocument } from '@core/modules/appointments/schemas';

export class AppointmentRepository {
  private readonly logger = new Logger(AppointmentRepository.name);

  public constructor(@InjectModel(Appointment.name) private model: Model<AppointmentDocument>) {}

  public async create(input: Partial<Appointment>): Promise<AppointmentDocument> {
    try {
      return await this.model.create(input);
    } catch (err) {
      throw Error(err);
    }
  }

  public async findOneById(id: string): Promise<AppointmentDocument> {
    try {
      const appointment = await this.model.findById(new Types.ObjectId(id));

      if (!appointment) {
        throw new NotFoundException(`No such appointment with id: ${id}`);
      }

      return appointment;
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  public async findOne(filter: FilterQuery<AppointmentDocument>): Promise<AppointmentDocument> {
    const appointment = await this.model.findOne(filter);

    if (!appointment) {
      throw new NotFoundException(`No such appointment`);
    }

    return appointment;
  }

  // TODO: add pagination
  public async findMany(filter: FilterQuery<AppointmentDocument>): Promise<AppointmentDocument[]> {
    try {
      return await this.model.find(filter);
    } catch (err) {
      throw Error(err);
    }
  }

  public async updateOne(id: string, input: Partial<Appointment>): Promise<AppointmentDocument> {
    const { date, doctor, patient, isActive, isDeleted } = input;

    try {
      const found = await this.findOneById(id);

      const filter: FilterQuery<AppointmentDocument> = {
        date: date && found.date,
        doctor: doctor && found.doctor,
        patient: patient && found.patient,
        isActive: isActive === found.isActive ? found.isActive : isActive,
        isDeleted: isDeleted === found.isDeleted ? found.isDeleted : isDeleted,
      };

      const updated = await this.model.findOneAndUpdate({ _id: new Types.ObjectId(id) }, filter, { new: true });

      if (!updated) {
        throw new Error(`Any appointment wasn\'t updated`);
      }

      return updated;
    } catch (err) {
      throw Error(err);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await this.findOneById(id);

      const deleted = await this.model.updateOne({ _id: new Types.ObjectId(id) }, { isDeleted: true });

      if (!deleted.modifiedCount) {
        throw new Error(`Any user wasn\'t updated`);
      }

      return deleted && true;
    } catch (err) {
      throw err;
    }
  }
}
