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

  getHello(): string {
    return 'Hello World!';
  }
}
