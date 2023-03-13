import { Injectable } from '@nestjs/common';
import { CheckVersionDto } from './dto/check-version.dto';

@Injectable()
export class VersionService {
  check(checkVersionDto: CheckVersionDto) {
    if (checkVersionDto.version === '1.1.9') return true;
    return false;
  }
}
