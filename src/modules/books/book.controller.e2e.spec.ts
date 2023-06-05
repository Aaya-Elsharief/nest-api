import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { BookService } from './book.service';
import { BookController } from './book.controller';

describe('AppController', () => {
  let app: INestApplication;
  const results = 'Hello World!';
  const bookService = {
    // getHello: jest.fn().mockResolvedValue(results),
    // getService: jest.fn().mockResolvedValue(results),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    })
      .overrideProvider(BookService)
      .useValue(bookService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('Get /book/one', async () => {
      // return request(app.getHttpServer()).get('/book/one').expect(200);
    });
  });
});
