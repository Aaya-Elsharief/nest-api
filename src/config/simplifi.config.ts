import { registerAs } from '@nestjs/config';

export default registerAs('simplifi', () => ({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  grant_type: process.env.GRANT_TYPE,
}));
