import { Module, Global } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExchangeType, Topics } from './common/event-constants/constants';

@Global()
@Module({
  imports: [
    ConfigModule,
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
  exports: [RabbitMQModule],
})
export class RabbitMQGlobalModule {}
