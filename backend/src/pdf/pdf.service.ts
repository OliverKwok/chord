import { Injectable } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';

const glob = require('glob-promise');

@Injectable()
export class PdfService {
  create(createPdfDto: CreatePdfDto) {
    return 'This action adds a new pdf';
  }

  findAll() {
    const response = glob('./public/pdfFile' + '**/**/*').then((pdfArray) => {
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
      return result[0].children[0].children[0].children;
    });

    return response;
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
