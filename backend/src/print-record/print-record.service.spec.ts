import { Test, TestingModule } from '@nestjs/testing';
import { PrintRecordService } from './print-record.service';

describe('PrintRecordService', () => {
  let service: PrintRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrintRecordService],
    }).compile();

    service = module.get<PrintRecordService>(PrintRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
