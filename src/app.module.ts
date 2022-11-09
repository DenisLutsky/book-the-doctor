import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from './configs';

import { RepositoriesModule } from '@shared/modules';
import { AppointmentsModule, UsersModule } from './modules';

@Module({
  imports: [MongooseModule.forRoot(connectionString), UsersModule, RepositoriesModule, AppointmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
