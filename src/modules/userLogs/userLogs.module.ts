import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FirebaseModule } from '../firebase/firebase.module';
import { UserModule } from '../users/user.module';

import { Events } from './events/data.event';
import { UserLogsController } from './userLogs.controller';
import { UserLogsRepository } from './userLogs.repository';
import { UserLogs, UserLogsSchema } from './userLogs.schema';
import { UserLogsService } from './userLogs.service';

@Module({
  imports: [
    FirebaseModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: UserLogs.name,
        schema: UserLogsSchema,
      },
    ]),
  ],
  providers: [UserLogsService, UserLogsRepository, Events],
  controllers: [UserLogsController],
  exports: [UserLogsService],
})
export class UserLogsModule {}
