import { Injectable } from '@nestjs/common';
import { CreatePrintRecordDto } from './dto/create-print-record.dto';
import { UpdatePrintRecordDto } from './dto/update-print-record.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class PrintRecordService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  create(createPrintRecordDto: CreatePrintRecordDto) {
    return 'This action adds a new printRecord';
  }

  async findAll() {
    try {
      // const printRecord = await this.knex.table('student').select('id', 'name');
      // return printRecord;
      return 'find all print records';
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} printRecord`;
  }

  update(id: number, updatePrintRecordDto: UpdatePrintRecordDto) {
    return `This action updates a #${id} printRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} printRecord`;
  }
}
