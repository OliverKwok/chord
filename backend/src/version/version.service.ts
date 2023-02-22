import { Injectable } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@Injectable()
export class VersionService {
  create(createVersionDto: CreateVersionDto) {
    if (createVersionDto.version === '1.0.0') return true;
    return false;
  }

  findAll() {
    return true;
  }

  findOne(id: number) {
    return `This action returns a #${id} version`;
  }

  update(id: number, updateVersionDto: UpdateVersionDto) {
    return `This action updates a #${id} version`;
  }

  remove(id: number) {
    return `This action removes a #${id} version`;
  }
}
