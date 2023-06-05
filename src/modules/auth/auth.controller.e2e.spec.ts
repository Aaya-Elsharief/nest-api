import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AppController', () => {
  let app: INestApplication;
  const results = 'Hello World!';
  const authService = {
    // getHello: jest.fn().mockResolvedValue(results),
    // getService: jest.fn().mockResolvedValue(results),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('Get /', async () => {
      return request(app.getHttpServer()).get('/').expect(200).expect('aswd');
    });
  });
});
