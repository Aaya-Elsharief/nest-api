import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => ({
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDERID,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID,

  downLoadPath: process.env.DOWNLOAD_PATH,

  // type: process.env.TYPE,
  // project_id: process.env.PROJECT_ID,
  // private_key_id: process.env.PRIVATE_KEY_ID,
  // private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  // client_email: process.env.CLIENT_EMAIL,
  // client_id: process.env.CLIENT_ID,
  // auth_uri: process.env.AUTH_URI,
  // token_uri: process.env.TOKEN_URI,
  // auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  // client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
}));
