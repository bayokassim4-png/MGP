import { Test, TestingModule } from '@nestjs/testing';
import { PpmService } from './ppm.service';

describe('PpmService', () => {
  let service: PpmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PpmService],
    }).compile();

    service = module.get<PpmService>(PpmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
