import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
//import chalk from 'chalk';
const chalk = require('chalk');

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

  await app.listen(configService.get('PORT', 3003), async () => Logger.log(`${await app.getUrl()}, API Doc: ${configService.get('APP_URL')}`))
}

//bootstrap().then(() => Logger.log(chalk.whiteBright.bgBlack` Quiz Calc ` + ` application successfully started in ${process.env.NODE_ENV || 'development' || 'production'} mode`));
bootstrap().then(() => Logger.log(`Quiz Calc application successfully started in ${process.env.NODE_ENV || 'development' || 'production'} mode`));