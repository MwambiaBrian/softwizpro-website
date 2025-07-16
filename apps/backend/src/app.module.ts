import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesOfferedModule } from './services-offered/services-offered.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JobPostingModule } from './job-posting/job-posting.module';
import { TestimonialModule } from './testimonial/testimonial.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/softwizpro'),
    AuthModule,
    UsersModule,
    ServicesOfferedModule,
    JobPostingModule,
    TestimonialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
