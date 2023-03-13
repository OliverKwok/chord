import { Injectable } from '@nestjs/common';
import { CheckIpDto } from './dto/check-ip.dto';

@Injectable()
export class IpService {
  create(checkIpDto: CheckIpDto) {
    if (checkIpDto.ip) return true;
    return false;
  }
}
