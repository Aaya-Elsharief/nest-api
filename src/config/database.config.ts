import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABESE_URL,
}));
