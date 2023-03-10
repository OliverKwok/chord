import { Injectable } from '@nestjs/common';
import { CreatePrintRecordDto } from './dto/create-print-record.dto';
import { UpdatePrintRecordDto } from './dto/update-print-record.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class PrintRecordService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createPrintRecordDto: CreatePrintRecordDto) {
    try {
      const newPrintRecord = await this.knex.table('print_record').insert({
        student_id: createPrintRecordDto.student_id,
        print_file_name: createPrintRecordDto.print_file_name,
      });
      return newPrintRecord;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }
  }

  async findAll() {
    try {
      const printRecord = await this.knex
        .table('print_record')
        .select('student_id', 'print_file_name');
      return printRecord;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }
  }

  async findOne(id: number) {
    try {
      const printRecord = await this.knex
        .table('print_record')
        .select('student_id', 'print_file_name')
        .where('student_id', id);
      return printRecord;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }
  }

  update(id: number, updatePrintRecordDto: UpdatePrintRecordDto) {
    return `This action updates a #${id} printRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} printRecord`;
  }
}
