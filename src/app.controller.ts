import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/8')
  getService() {
    return 'getService';
  }

  @Get('apiKey')
  getENVKEY() {
    return this.configService.get('api.apiKey');
  }
}
