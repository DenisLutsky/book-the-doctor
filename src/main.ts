import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { appConfig } from './configs';

import { AppModule } from './app.module';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(appConfig.port);
})();
