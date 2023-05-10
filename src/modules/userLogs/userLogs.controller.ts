import { Controller } from '@nestjs/common';

// import { UserLogs } from './userLogs.schema';
import { UserLogsService } from './userLogs.service';

@Controller('userlogs')
export class UserLogsController {
  constructor(private readonly userLogsService: UserLogsService) {}

  // @Get()
  // @Header('Content-Disposition', 'attachment; filename="SheetJSNest.csv"')
  // @Header('Content-Type', 'text/csv')
  // async findAll() {
  //   return this.userLogsService.getReport('id');
  // }
}
