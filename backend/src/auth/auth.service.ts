import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    return user;
    // if (user && (await bcrypt.compare(user.password, pass))) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async login(user: any) {
    const payload = await this.userService.check({
      username: user.username,
      password: user.password,
    });

    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
