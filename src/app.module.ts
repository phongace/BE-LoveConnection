import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './schema/user.chema';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/lovedb'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
