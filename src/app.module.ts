import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from './configs';

import { HttpExceptionFilter } from '@shared/filters';
import { RepositoriesModule } from '@shared/modules';
import { AppointmentsModule, UsersModule } from './modules';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(connectionString), UsersModule, RepositoriesModule, AppointmentsModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
