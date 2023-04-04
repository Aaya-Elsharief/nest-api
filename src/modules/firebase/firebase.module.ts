import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FirebaseController } from './firebase.controller';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [MulterModule.register({})],
  providers: [FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
