import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
// Interval, Timeout

import { UserLogsService } from '../userLogs/userLogs.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly userLogsServic: UserLogsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM, { name: 'daily:Backup' })
  dailyBackup() {
    const _id = '64074c7fa43c58d436f32b96';
    this.userLogsServic.prepareReport(_id);
  }

  // @Cron(CronExpression.EVERY_30_SECONDS, { name: 'cronLogger' })
  // cronLogger() {
  //   this.logger.debug('Cron Logger');
  // }

  // @Interval('intervalLogger', 10000)
  // intervalLogger() {
  //   this.logger.debug('Interval Logger');
  // }

  // @Timeout('timeoutLogger', 2500)
  // timeoutLogger() {
  //   this.logger.debug('Timeout Logger');
  // }
}
