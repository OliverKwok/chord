import { Injectable } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';

import * as fs from 'fs';
import * as path from 'path';

const fileName = 'pdfList.json';
const jsonPath = path.join(__dirname.replace('/dist/src/pdf', ''), fileName);
console.log(jsonPath);

const glob = require('glob-promise');

@Injectable()
export class PdfService {
  create(createPdfDto: CreatePdfDto) {
    return 'This action adds a new pdf';
  }

  getPdfJson() {
    const data = fs.readFileSync(jsonPath, 'utf8');
    return data;
  }

  async genPdfJson() {
    const output = await glob(
      path.join(__dirname.replace('/dist/src/pdf', ''), 'public') + '**/**/*',
    ).then((pdfArray) => {
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

      function findPublicFolderInJson(input) {
        if (input[0].name == 'public') {
          result = input[0].children[1].children;
        } else {
          findPublicFolderInJson(input[0].children);
        }
      }

      findPublicFolderInJson(result);

      return result;
    });

    try {
      fs.writeFileSync(jsonPath, JSON.stringify(output));
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
