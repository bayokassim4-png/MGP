import { Test, TestingModule } from '@nestjs/testing';
import { PtbaService } from './ptba.service';

describe('PtbaService', () => {
  let service: PtbaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PtbaService],
    }).compile();

    service = module.get<PtbaService>(PtbaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
