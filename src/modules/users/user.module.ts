/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';

const AutoIncrement = require('mongoose-sequence');

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (connection: Connection) => {
          const schema = UserSchema;
          schema.plugin(AutoIncrement(connection), { inc_field: 'userId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
