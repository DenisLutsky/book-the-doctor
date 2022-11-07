import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from './configs';

@Module({
  imports: [MongooseModule.forRoot(connectionString)],
  controllers: [],
  providers: [],
})
export class AppModule {}
