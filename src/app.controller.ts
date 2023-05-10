import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { simplifiCodes } from './constants/simplifi-error-codes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return Object.keys(simplifiCodes).length;
  }
}
