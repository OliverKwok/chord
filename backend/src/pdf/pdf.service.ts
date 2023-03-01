import { Injectable } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';

import * as fs from 'fs';
import * as path from 'path';

const fileName = 'pdfList.json';
const filePathBeforeFileName = __dirname.replace('dist/pdf', '');
const absolutePathWithFileName = path.join(filePathBeforeFileName, fileName);

console.log(absolutePathWithFileName);

const glob = require('glob-promise');

@Injectable()
export class PdfService {
  create(createPdfDto: CreatePdfDto) {
    return 'This action adds a new pdf';
  }

  getPdfJson() {
    const data = fs.readFileSync(absolutePathWithFileName, 'utf8');
    return data;
  }

  async genPdfJson() {
    const output = await glob('../public' + '**/**/*').then((pdfArray) => {
      let result = [];
      let level = { result };

      pdfArray.forEach((path) => {
        path.split('/').reduce((r, name, i, a) => {
          if (!r[name]) {
            r[name] = { result: [] };
            r.result.push({ name, children: r[name].result });
          }
          return r[name];
        }, level);
      });
      return result[0].children[0].children[1].children;
    });

    try {
      fs.writeFileSync(absolutePathWithFileName, JSON.stringify(output));
    } catch (error) {
      console.error('Error writing to file:', error);
    }

    return 'success';
  }

  findOne(id: number) {
    return `This action returns a #${id} pdf`;
  }

  update(id: number, updatePdfDto: UpdatePdfDto) {
    return `This action updates a #${id} pdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdf`;
  }
}
