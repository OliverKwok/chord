import { Test, TestingModule } from '@nestjs/testing';
import { PrintRecordController } from './print-record.controller';
import { PrintRecordService } from './print-record.service';

describe('PrintRecordController', () => {
  let controller: PrintRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrintRecordController],
      providers: [PrintRecordService],
    }).compile();

    controller = module.get<PrintRecordController>(PrintRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
