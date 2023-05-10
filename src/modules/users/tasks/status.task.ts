import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { UserService } from '../user.service';

@Injectable()
export class userStatus {
  constructor(private userService: UserService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM, { name: 'userStatus' })
  handleUserStatus() {
    this.userService.updateStatus();
  }
}
