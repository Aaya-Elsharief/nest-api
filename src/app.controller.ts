import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { simplifiCodes } from './constants/simplifi-error-codes';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello() {
    return Object.keys(simplifiCodes).length;
  }

  @Get('apiKey')
  getENVKEY() {
    return this.configService.get('api.apiKey');
  }
}
