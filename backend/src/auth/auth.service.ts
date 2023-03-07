import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      // 1st: user input, 2nd: db
      const { password, ...result } = user; // get the key value pair other than the password, and assign it to const result
      return result;
    }
    // Password not match
    // throw 401 error by local strategy
    return null;
  }

  // gen the jwt token
  async login(user: any) {
    const payload = {
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
