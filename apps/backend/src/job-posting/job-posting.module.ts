import { Module } from '@nestjs/common';
import { JobPostingController } from './job-posting.controller';
import { JobPostingService } from './job-posting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobPostingSchema } from './schemas/job-posting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'JobPosting', schema: JobPostingSchema },
    ]),
  ],
  controllers: [JobPostingController],
  providers: [JobPostingService],
})
export class JobPostingModule {}
