import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from './schemas/testimonial.schema';
import { CreateTestimonialDto } from './dtos/create-testimonial.dto';
import { UpdateTestimonialDto } from './dtos/update-testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectModel('Testimonial') private readonly model: Model<Testimonial>,
  ) {}

  async create(dto: CreateTestimonialDto): Promise<Testimonial> {
    return new this.model(dto).save();
  }

  async findAll(): Promise<Testimonial[]> {
    return this.model.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Testimonial> {
    const item = await this.model.findById(id);
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }

  async update(id: string, dto: UpdateTestimonialDto): Promise<Testimonial> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Testimonial not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Testimonial not found');
  }
  async updateStatus(id: string, status: string) {
    return this.model.findByIdAndUpdate(id, { status }, { new: true });
  }
}
