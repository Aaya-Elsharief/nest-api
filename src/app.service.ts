import { Inject, Injectable } from '@nestjs/common';
import {
  FIREBASE_ADMIN_INJECT,
  FirebaseAdminSDK,
} from '@tfarras/nestjs-firebase-admin';

@Injectable()
export class AppService {
  constructor(
    @Inject(FIREBASE_ADMIN_INJECT) private firebaseAdmin: FirebaseAdminSDK,
  ) {}

  // async uploadFile(): Promise<IServiceInterface> {
  //   const filename = 'README.md';
  //   const buckets = await this.firebaseAdmin
  //     .storage()
  //     .bucket('nest-api-2b581.appspot.com');

  //   const downLoadPath =
  //     'https://firebasestorage.googleapis.com/v0/b/nest-api-2b581.appspot.com/o/';

  //   const FileResponse = await buckets.upload(filename, {
  //     destination: `sth/${filename}-${moment().format()}`,
  //     resumable: true,
  //   });

  //   const FileUrl = `${downLoadPath}${encodeURIComponent(
  //     FileResponse[0].name,
  //   )}?alt=media`;
  //   return { data: FileUrl };
  // }

  getHello(): string {
    return 'Hello World!';
  }

  getService(): string {
    return 'getService';
  }
}
