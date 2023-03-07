import { Injectable } from '@nestjs/common';
import { CheckUserDto } from './dto/check-user.dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async check(checkUserDto: CheckUserDto) {
    try {
      const user = await this.knex
        .table('users')
        .select('id', 'username')
        .where({
          username: checkUserDto.username,
          password: checkUserDto.password,
        });

      if (user.length === 0) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      } else {
        return user[0];
      }
    } catch (err) {
      throw new HttpException('message', 400, {
        cause: new Error('Cannot connect to the DB'),
      });
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    return {
      id: 1,
      username: username,
      password: await bcrypt.hash('1122', 10),
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
