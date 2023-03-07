import { Injectable } from '@nestjs/common';
import { CheckUserDto } from './dto/check-user.dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async check(checkUserDto: CheckUserDto) {
    let user;
    try {
      user = await this.knex
        .table('users')
        .select('username', 'password')
        .where({
          username: checkUserDto.username,
        });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }

    if (user.length === 0) {
      // User not found
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } else if (user.length === 1) {
      const checkResult = await bcrypt.compare(
        checkUserDto.password,
        user[0].password,
      );

      if (checkResult) {
        return { username: user[0].username };
      } else {
        // Password not match
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
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
