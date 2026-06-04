import { Test, TestingModule } from '@nestjs/testing';
import { PtbaController } from './ptba.controller';

describe('PtbaController', () => {
  let controller: PtbaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PtbaController],
    }).compile();

    controller = module.get<PtbaController>(PtbaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
