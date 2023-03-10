import { Module } from '@nestjs/common';
import { PrintRecordService } from './print-record.service';
import { PrintRecordController } from './print-record.controller';

@Module({
  controllers: [PrintRecordController],
  providers: [PrintRecordService]
})
export class PrintRecordModule {}
