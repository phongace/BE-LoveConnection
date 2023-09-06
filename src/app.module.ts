import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/lovedb'),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
