import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Appointment, AppointmentSchema } from 'src/modules/appointments/schemas';
import { Photo, PhotoSchema, User, UserSchema } from 'src/modules/users/schemas';
import { AppointmentRepository } from './appointment.repository';
import { PhotoRepository } from './photo.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Photo.name, schema: PhotoSchema },
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  providers: [AppointmentRepository, UserRepository, PhotoRepository],
  exports: [AppointmentRepository, UserRepository, PhotoRepository],
})
export class RepositoriesModule {}
