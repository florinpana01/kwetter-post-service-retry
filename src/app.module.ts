import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Totamealand1983',
      database: 'kwetter-posts',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
