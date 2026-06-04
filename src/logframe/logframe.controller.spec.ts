import { Test, TestingModule } from '@nestjs/testing';
import { LogframeController } from './logframe.controller';

describe('LogframeController', () => {
  let controller: LogframeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogframeController],
    }).compile();

    controller = module.get<LogframeController>(LogframeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
