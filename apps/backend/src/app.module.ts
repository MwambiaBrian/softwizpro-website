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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobApplicationModule } from './job-application/job-application.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available across the entire app
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    ServicesOfferedModule,
    JobPostingModule,
    TestimonialModule,
    JobApplicationModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
