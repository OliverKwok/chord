import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrintRecordService } from './print-record.service';
import { CreatePrintRecordDto } from './dto/create-print-record.dto';
import { UpdatePrintRecordDto } from './dto/update-print-record.dto';

@Controller('print-record')
export class PrintRecordController {
  constructor(private readonly printRecordService: PrintRecordService) {}

  @Post()
  create(@Body() createPrintRecordDto: CreatePrintRecordDto) {
    return this.printRecordService.create(createPrintRecordDto);
  }

  @Get()
  findAll() {
    return this.printRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.printRecordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrintRecordDto: UpdatePrintRecordDto) {
    return this.printRecordService.update(+id, updatePrintRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.printRecordService.remove(+id);
  }
}
