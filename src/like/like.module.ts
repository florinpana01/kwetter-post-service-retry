import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    ClientsModule.register([
      {
        name: 'LIKE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://iygyoums:Ff8WVU7zxhJdki1R5sGzOPrUadHTzQjZ@kangaroo.rmq.cloudamqp.com/iygyoums'],
          queue: "post-queue",
          queueOptions: {
            durable: false 
          },
        },
      },
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}
