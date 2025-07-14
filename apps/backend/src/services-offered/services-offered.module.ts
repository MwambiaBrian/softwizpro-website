import { Module } from '@nestjs/common';
import { ServicesService } from './services-offered.service';
import { ServicesController } from './services-offered.controller';
import { Service, ServiceSchema } from './schemas/service.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesOfferedModule {}
