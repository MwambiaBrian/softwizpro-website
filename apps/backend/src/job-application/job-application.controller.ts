import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly service: JobApplicationService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './uploads/resumes',
        filename: (_req, file, cb) => {
          const filename = Date.now() + '-' + file.originalname;
          cb(null, filename);
        },
      }),
    }),
  )
  create(
    @Body() body: CreateJobApplicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(body, file.filename);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
  @Get('job/:jobId')
  findByJob(@Param('jobId') jobId: string) {
    return this.service.findByJobId(jobId);
  }
}
