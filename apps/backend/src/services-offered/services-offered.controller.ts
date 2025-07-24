// src/services/services.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Get,
  Param,
  NotFoundException,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ServicesService } from './services-offered.service';
import { UpdateServiceDto } from './dtos/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 10 }], {
      storage: diskStorage({
        destination: './uploads/services',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async createService(
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() body: any,
  ) {
    const parsedFeatures = Array.isArray(body.features)
      ? body.features
      : [body.features];

    const parsedFaqs = Array.isArray(body.faqs)
      ? body.faqs.map((faq) =>
          typeof faq === 'string' ? JSON.parse(faq) : faq,
        )
      : [JSON.parse(body.faqs)];

    const newService = await this.service.create({
      ...body,
      features: parsedFeatures,
      faqs: parsedFaqs,
      photos: files?.photos?.map((file) => file.filename) || [],
    });

    return newService;
  }
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const serviceItem = await this.service.findOne(id);
    if (!serviceItem) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return serviceItem;
  }
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 10 }], {
      storage: diskStorage({
        destination: './uploads/services',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
    @Body() body: any,
  ) {
    const parsedFeatures = Array.isArray(body.features)
      ? body.features
      : [body.features];

    const parsedFaqs = Array.isArray(body.faqs)
      ? body.faqs.map((faq) =>
          typeof faq === 'string' ? JSON.parse(faq) : faq,
        )
      : [JSON.parse(body.faqs)];

    const updatePayload: any = {
      ...body,
      features: parsedFeatures,
      faqs: parsedFaqs,
    };

    if (files?.photos?.length) {
      updatePayload.photos = files.photos.map((file) => file.filename);
    }

    const updated = await this.service.update(id, updatePayload);

    if (!updated) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.service.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return { message: 'Service deleted successfully' };
  }
}
