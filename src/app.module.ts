import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from './configs';

import { AppointmentsModule, UsersModule } from '@core/modules';
import { AuthModule } from '@core/auth/auth.module';
import { RepositoriesModule, NotificationsModule } from '@shared/modules';
import { HttpExceptionFilter } from '@shared/filters';
import { QueuesModule } from './shared/modules/queues/queues.module';

@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    UsersModule,
    RepositoriesModule,
    AppointmentsModule,
    AuthModule,
    NotificationsModule,
    QueuesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
