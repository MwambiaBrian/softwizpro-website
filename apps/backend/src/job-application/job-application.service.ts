import {
  JobApplication,
  JobApplicationDocument,
  JobApplicationSchema,
} from './schema/JobApplicaton.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectModel(JobApplication.name)
    private jobApplicationModel: Model<JobApplicationDocument>,
  ) {}

  async create(data: CreateJobApplicationDto, resumePath: string) {
    return this.jobApplicationModel.create({ ...data, resumePath });
  }

  async findAll() {
    return this.jobApplicationModel
      .find()
      .populate('jobId')
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return this.jobApplicationModel.findById(id).populate('jobId');
  }
  async findByJobId(jobId: string) {
    return this.jobApplicationModel.find({ jobId }).sort({ createdAt: -1 });
  }
}
