import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhotoDocument = HydratedDocument<Photo>;

@Schema({ timestamps: true })
export class Photo {
  @Prop({ type: String })
  public url: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
