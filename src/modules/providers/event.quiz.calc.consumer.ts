import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Consumers, SendQuizCalculationRoutingKey, Topics } from '../../common/event-constants/constants';

@Injectable()
export class EventQuizCalcConsumer {
  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC({
    exchange: Topics.EventQuizCalcTopic,
    routingKey: SendQuizCalculationRoutingKey.QuizCalculationSentRK,
    queue: Consumers.CommandCalculationConsumer,
    queueOptions: {
      durable: true,
    }
  })
  async eventReceivedInvitation(data: any) {
    data = JSON.parse(data)
    console.log("The data has been received successfully", data);
    console.log({"message": "I did it"});

    // if(this.i < 5){
    //   this.i++
    //   console.log(`attempted: ${this.i}`);
    //   throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    // }
    return {"message": "I did it"}
  }

}