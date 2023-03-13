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
      const studentList = await this.knex.table('student').select('id', 'name');
      // console.log(studentList);
      return studentList;
    } catch (err) {
      console.log(err);
      // throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
