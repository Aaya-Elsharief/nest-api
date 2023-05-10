import { Module } from '@nestjs/common';

import { UserLogsModule } from '../userLogs/userLogs.module';

import { TasksService } from './tasks.service';

@Module({
  imports: [UserLogsModule],
  providers: [TasksService],
})
export class TasksModule {}
