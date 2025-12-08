import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ExchangeType, Topics } from './common/event-constants/constants';
import { RabbitMQGlobalModule } from './rabbitmq.module';
import {EventQuizCalcConsumer} from "./modules/providers/event.quiz.calc.consumer";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      expandVariables: true,
    }),

    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          { name: Topics.EventQuizCalcTopic, type: ExchangeType.Topic },
        ],
        // uri: configService.get<string | undefined>('RABBITMQ_URL'),
        uri: 'amqp://localhost:5672',
        connectionInitOptions: { wait: true },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
      AppService,
      EventQuizCalcConsumer
  ],
})
export class AppModule {}
