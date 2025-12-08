import { Injectable } from '@nestjs/common';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Consumers, SendQuizCalculationRoutingKey, Topics } from '../../common/event-constants/constants';

@Injectable()
export class EventQuizCalcConsumer {

  constructor() {}

  @RabbitSubscribe({
    exchange: Topics.EventQuizCalcTopic,
    routingKey: SendQuizCalculationRoutingKey.QuizCalculationSentRK,
    queue: Consumers.CommandCalculationConsumer,
    queueOptions: {
      durable: true,
    }
  })
  async eventReceivedInvitation(data: any) {
    data = JSON.parse(data)
    console.log(data);
    return "OK"
  }

}