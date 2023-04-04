import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import { IServiceInterface } from 'src/Interfaces/IService.interface';

import { renameFile } from './helpers/renameFile';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private firebaseAdmin: FirebaseAdminSDK,
    private configService: ConfigService,
  ) {}

  async uploadFiles(
    path: string,
    files: Express.Multer.File[],
  ): Promise<IServiceInterface> {
    const bucket = await this.firebaseAdmin
      .storage()
      .bucket(this.configService.get('firebase.storageBucket'));
    const downLoadPath = this.configService.get('firebase.downLoadPath');

    const filesUrl = [];

    for (const fileObj of files) {
      const fileWithPath = `${path}/${renameFile(fileObj)}`;
      const bucketFile = await bucket.file(fileWithPath);
      await bucketFile.save(Buffer.from(fileObj.buffer), {
        metadata: { contentType: fileObj.mimetype },
      });
      await bucketFile.makePublic();
      const fileUrl = `${downLoadPath}${encodeURIComponent(
        fileWithPath,
      )}?alt=media`;
      console.log('fileUrl: ', fileUrl);
      filesUrl.push(fileUrl);
    }

    return { data: filesUrl };
  }
}
