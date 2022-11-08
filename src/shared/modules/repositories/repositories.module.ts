import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Photo, PhotoSchema, User, UserSchema } from 'src/modules/users/schemas';
import { PhotoRepository } from './photo.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Photo.name, schema: PhotoSchema },
    ]),
  ],
  providers: [UserRepository, PhotoRepository],
  exports: [UserRepository, PhotoRepository],
})
export class RepositoriesModule {}
