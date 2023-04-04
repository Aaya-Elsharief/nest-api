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

import { UploadFileDto } from './dtos/uploadFile.dto';
import { FirebaseService } from './firebase.service';
import { imageOrDocFileFilter } from './helpers/imageOrDocFileFilter';

@Controller('upload')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post(':path')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      fileFilter: imageOrDocFileFilter,
    }),
  )
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        // exceptionFactory: (error: any) => {
        //   return error;
        // },
      }),
    )
    files: Array<Express.Multer.File>,
    @Param() payload: UploadFileDto,
  ) {
    return this.firebaseService.uploadFiles(payload.path, files);
  }
}
