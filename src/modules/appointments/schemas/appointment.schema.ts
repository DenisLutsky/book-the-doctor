import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/schemas';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true, type: Date })
  public date: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  public patient: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
  public doctor: string;

  @Prop({ type: Boolean, default: false })
  public isActive: boolean;

  @Prop({ type: Boolean, default: false })
  public isDeleted: boolean;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
