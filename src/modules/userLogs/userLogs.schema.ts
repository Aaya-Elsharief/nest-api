import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserLogsDocuoment = HydratedDocument<UserLogs>;

@Schema({ timestamps: true, collection: 'UserLogs', autoIndex: true })
export class UserLogs {
  user_after: { gender: string };
}

export const UserLogsSchema = SchemaFactory.createForClass(UserLogs);
