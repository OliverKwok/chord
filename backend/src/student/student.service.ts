import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class StudentService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll() {
    try {
      const studentList = await this.knex
        .table('student')
        .select('id', 'level', 'name')
        .orderBy('level', 'asc');
      return studentList;
    } catch (err) {
      console.log('Error: render student list', err.message);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOne(id: number) {
    try {
      const student = await this.knex.table('student').where('id', id);
      return student[0];
    } catch (err) {
      console.log('Error: get one student detail', err.message);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
