import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://iygyoums:Ff8WVU7zxhJdki1R5sGzOPrUadHTzQjZ@kangaroo.rmq.cloudamqp.com/iygyoums'],
      queue: 'post-queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen();
}
bootstrap();
