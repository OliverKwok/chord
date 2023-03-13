import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IpService } from './ip.service';
import { CheckIpDto } from './dto/check-ip.dto';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Post()
  create(@Body() checkIpDto: CheckIpDto) {
    return this.ipService.create(checkIpDto);
  }
}
