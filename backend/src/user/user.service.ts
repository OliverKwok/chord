import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.knex
        .table('users')
        .insert({
          username: 'chord',
          password: '1122',
        })
        .returning(['username', 'password']);

      return newUser[0];
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}