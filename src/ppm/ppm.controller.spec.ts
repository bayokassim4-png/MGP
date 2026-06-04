import { Test, TestingModule } from '@nestjs/testing';
import { PpmController } from './ppm.controller';

describe('PpmController', () => {
  let controller: PpmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PpmController],
    }).compile();

    controller = module.get<PpmController>(PpmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
