import { Test, TestingModule } from '@nestjs/testing';
import { LogframeService } from './logframe.service';

describe('LogframeService', () => {
  let service: LogframeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogframeService],
    }).compile();

    service = module.get<LogframeService>(LogframeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
