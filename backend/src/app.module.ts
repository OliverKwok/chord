import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// import { ConfigModule } from '@nestjs/config'; // from doc
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

@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'postgresql',
          connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            database: 'chord',
          },
        },
        // config: config[process.env.NODE_ENV ?? 'development'],
      }),
    }),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
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
