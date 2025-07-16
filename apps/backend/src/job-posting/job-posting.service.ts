import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobPosting } from './schemas/job-posting.schema';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectModel('JobPosting') private readonly jobModel: Model<JobPosting>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<JobPosting> {
    const newJob = new this.jobModel(createJobDto);
    return newJob.save();
  }

  async findAll(): Promise<JobPosting[]> {
    return this.jobModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<JobPosting> {
    const job = await this.jobModel.findById(id).exec();
    if (!job) throw new NotFoundException(`Job with ID ${id} not found`);
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<JobPosting> {
    const updated = await this.jobModel.findByIdAndUpdate(id, updateJobDto, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundException(`Job with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Job with ID ${id} not found`);
  }
}
