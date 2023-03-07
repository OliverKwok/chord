import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findOne(username: string): Promise<any> {
    let user;
    try {
      user = await this.knex
        .table('users')
        .select('username', 'password')
        .where({
          username: username,
        });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_GATEWAY);
    }

    if (user.length === 0) {
      // User not found
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user[0];
  }
}
