import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SimplifiController } from './simplifi.controller';
import { SimplifiService } from './simplifi.service';

@Module({
  imports: [HttpModule],
  controllers: [SimplifiController],
  providers: [SimplifiService],
})
export class SimplifiModule {}
