import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesOfferedModule } from './services-offered/services-offered.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/softwizpro'),
    AuthModule,
    UsersModule,
    ServicesOfferedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
