import { Controller, Post, Body } from '@nestjs/common';
import { VersionService } from './version.service';
import { CheckVersionDto } from './dto/check-version.dto';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Post()
  check(@Body() checkVersionDto: CheckVersionDto) {
    return this.versionService.check(checkVersionDto);
  }
}
