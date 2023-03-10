import { PartialType } from '@nestjs/mapped-types';
import { CreatePrintRecordDto } from './create-print-record.dto';

export class UpdatePrintRecordDto extends PartialType(CreatePrintRecordDto) {}
