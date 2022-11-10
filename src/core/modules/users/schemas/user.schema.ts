import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { RolesEnum } from 'src/shared/enums';
import { Photo } from './photo.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, type: String })
  public email: string;

  @Prop({ required: true, type: String })
  public password: string;

  @Prop({ required: true, type: String })
  public firstName: string;

  @Prop({ required: true, type: String })
  public lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Photo.name })
  public photo: string;

  @Prop({ type: String })
  public phone: string;

  @Prop({ required: true, enum: RolesEnum, default: RolesEnum.PATIENT })
  public role: RolesEnum;

  @Prop({ type: Boolean, default: false })
  public isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
