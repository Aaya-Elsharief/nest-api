import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: INestApplication;
  const results = 'Hello World!';
  const appService = {
    getHello: jest.fn().mockResolvedValue(results),
    getService: jest.fn().mockResolvedValue(results),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('Get /', async () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });
});
