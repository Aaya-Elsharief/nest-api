import {
  Controller,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { UserService } from '../users/user.service';

import { UploadFileDto } from './dtos/uploadFile.dto';
import { FirebaseService } from './firebase.service';
import { imageOrDocFileFilter } from './helpers/imageOrDocFileFilter';
@Controller()
export class FirebaseController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {}

  @Post('upload/:path')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      fileFilter: imageOrDocFileFilter,
    }),
  )
  uploadFiles(
    @UploadedFiles(new ParseFilePipe({}))
    files: Array<Express.Multer.File>,
    @Param() payload: UploadFileDto,
  ) {
    return this.firebaseService.uploadFiles(payload.path, files);
  }

  // @Get('download')
  // @Header('Content-Disposition', 'attachment; filename="SheetJSNest.csv"')
  // @Header('Content-Type', 'application/vnd.ms-excel')
  // async exportData() {
  //   const { data } = await this.userService.findAll();
  //   console.log('data: ', Object.keys(data[0]));
  //   const worksheet = xlsx.utils.json_to_sheet(data, {
  //     header: Object.keys(data[0]),
  //   });
  //   const csv = xlsx.utils.sheet_to_csv(worksheet);
  //   return csv;
  // }

  // @Get('stream')
  // async uploadStream() {
  //   return this.firebaseService.uploadStream();
  // }
}
