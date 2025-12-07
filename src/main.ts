import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Load the correct env file manually
  dotenv.config({ path: '.development.env' });

  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  const port = configService.get('PORT') ?? 3300;

  await app.listen(port);

  Logger.log(
    `${await app.getUrl()}, API Doc: ${configService.get('APP_URL')}`,
  );
}

bootstrap().then(() => {
  Logger.log(
    `Quiz Calculation application successfully started in ${
      process.env.NODE_ENV ?? 'development'
    } mode`,
  );
});