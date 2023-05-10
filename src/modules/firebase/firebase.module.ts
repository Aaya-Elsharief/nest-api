import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { UserModule } from '../users/user.module';

import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [UserModule, MulterModule.register({})],
  providers: [FirebaseService],
  controllers: [FirebaseController],
  exports: [FirebaseService],
})
export class FirebaseModule {}
