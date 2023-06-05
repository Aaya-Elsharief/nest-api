/* eslint-disable @typescript-eslint/no-var-requires */
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
import * as admin from 'firebase-admin';
import { redisStore } from 'cache-manager-redis-yet';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import { cert } from 'firebase-admin/app';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
// import { DevtoolsModule } from '@nestjs/devtools-integration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/books/book.module';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import firebaseConfig from './config/firebase.config';
import redisConfig from './config/redis.config';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { UserLogsModule } from './modules/userLogs/userLogs.module';
import { TasksModule } from './modules/tasks/tasks.module';
// import { SimplifiModule } from './modules/simplifi/simplifi.module';
import simplifiConfig from './config/simplifi.config';
import apiConfig from './config/api.config';

const serviceAccount = require('../serviceAccountKey.json');

@Module({
  imports: [
    BookModule,
    AuthModule,
    FirebaseModule,
    UserLogsModule,
    // SimplifiModule,
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [
        jwtConfig,
        databaseConfig,
        redisConfig,
        firebaseConfig,
        simplifiConfig,
        apiConfig,
      ],
      isGlobal: true,
      cache: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        mongoose.plugin(mongoosePaginate);
        mongoose.plugin(require('mongoose-aggregate-paginate-v2'));
        return { uri: configService.get('database.url') };
      },
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          password: configService.get('redis.password'),
          socket: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
          },
        }),
      }),
      inject: [ConfigService],
    }),
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        admin.initializeApp({
          credential: cert(serviceAccount),
          storageBucket: configService.get('firebase.storageBucket'),
          databaseURL: configService.get('firebase.databaseURL'),
        });

        return serviceAccount;
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CacheModule],
})
export class AppModule {}
