import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';
import { IServiceInterface } from 'src/Interfaces/IService.interface';
import * as functions from 'firebase-functions';
// Imports the Google Cloud client library

import { renameFile } from './helpers/renameFile';
import { resizeImages } from './helpers/resizeImages';
@Injectable()
export class FirebaseService {
  myFunction = functions.https.onRequest(async (req, res) => {
    const result = 'await myService.myMethod()';
    res.send(result);
  });
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

    const allFiles = await resizeImages(path, files);
    // console.log('allFiles: ', allFiles);

    const filesUrl = [];

    for (const fileObj of allFiles) {
      const fileWithPath = `${path}/${fileObj.fileName}`;
      const bucketFile = await bucket.file(fileWithPath);
      await bucketFile.save(Buffer.from(fileObj.buffer), {
        metadata: { contentType: fileObj.mimetype },
      });
      await bucketFile.makePublic();
      if (
        !fileObj.mimetype.includes('image') ||
        fileObj.fileName.includes('origin')
      ) {
        const fileUrl = `${downLoadPath}${encodeURIComponent(
          fileWithPath,
        )}?alt=media`;
        filesUrl.push(fileUrl);
      }
    }
    // console.log('filesUrl: ', filesUrl);

    return { data: filesUrl };
  }

  async uploadStream(fileStream: StreamableFile, fileName: string) {
    const bucket = await this.firebaseAdmin
      .storage()
      .bucket(this.configService.get('firebase.storageBucket'));
    fileName = await `${renameFile(fileName)}`;
    const downLoadPath = this.configService.get('firebase.downLoadPath');
    const file = bucket.file(`Reports/${fileName}`);

    await new Promise(async (resolve, reject) => {
      await fileStream
        .getStream()
        .pipe(file.createWriteStream())
        .on('error', reject)
        .on('finish', resolve);
    });
    // console.log('File uploaded successfully.');
    const fileUrl = `${downLoadPath}${encodeURIComponent(
      `Reports/${fileName}`,
    )}?alt=media`;
    return fileUrl;
  }
}
