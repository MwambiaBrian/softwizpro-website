import { Test, TestingModule } from '@nestjs/testing';
import { ServicesOfferedController } from './services-offered.controller';

describe('ServicesOfferedController', () => {
  let controller: ServicesOfferedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesOfferedController],
    }).compile();

    controller = module.get<ServicesOfferedController>(ServicesOfferedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
