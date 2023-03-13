import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { KnexModule } from 'nestjs-knex';
import * as config from '../knexfile';
import { config as Config } from 'dotenv';

import { PdfModule } from './pdf/pdf.module';
import { VersionModule } from './version/version.module';
import { IpModule } from './ip/ip.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrintRecordModule } from './print-record/print-record.module';
import { StudentModule } from './student/student.module';

Config();
console.log(process.env.DB_NAME);

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'postgresql',
          connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          },
        },
        // config: config[process.env.NODE_ENV ?? 'development'],
      }),
    }),
    PdfModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname.replace('/dist/src', ''), 'public'),
    }),
    VersionModule,
    IpModule,
    StatsModule,
    UserModule,
    AuthModule,
    PrintRecordModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
