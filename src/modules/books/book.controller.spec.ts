import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';

const moduleMocker = new ModuleMocker(global);

describe('bookController', () => {
  let bookController: BookController;
  const bookService = {
    findById: jest.fn().mockReturnValue('Hello World!'),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookController],
      // providers: [BookService],
    })
      .useMocker((token) => {
        if (token === BookService) {
          return bookService;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      // .overrideProvider(BookService)
      // .useValue(bookService)
      .compile();

    bookController = moduleRef.get<BookController>(BookController);
  });

  it('should return Hello World!', () => {
    expect(bookController.findBook('id')).toMatch('Hello World');
  });
});

describe('bookService', () => {
  let bookService: BookService;
  const book = { id: '157ased', name: 'test' };
  const bookRepositoryMock = {
    findOne: jest
      .fn()
      .mockResolvedValue({ data: { id: '157ased-', name: 'test' } }),
  };
  const connectionMock = {};
  const cacheManagerMock = {
    get: jest.fn().mockImplementation((key: string) => {
      return key === 'book_id:157ased' ? book : null;
    }),
    set: jest.fn().mockResolvedValue({ done: true }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useValue: bookRepositoryMock,
        },
        {
          provide: 'DatabaseConnection',
          useValue: connectionMock,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: cacheManagerMock,
        },
      ],
    })
      // .useMocker((token) => {
      //   console.log('token: ', token);
      //   if (token === BookRepository) {
      //     return bookRepositoryMock;
      //   }
      //   if (token === 'DatabaseConnection') {
      //     return connectionMock;
      //   }
      //   if (token === 'CACHE_MANAGER') {
      //     return cacheManagerMock;
      //   }
      //   if (typeof token === 'function') {
      //     const mockMetadata = moduleMocker.getMetadata(
      //       token,
      //     ) as MockFunctionMetadata<any, any>;
      //     const Mock = moduleMocker.generateFromMetadata(mockMetadata);
      //     return new Mock();
      //   }
      // })
      // .overrideProvider(BookService)
      // .useValue(bookService)
      .compile();

    bookService = moduleRef.get<BookService>(BookService);
  });
  it('should return one book from getter', async () => {
    const _id = '157ased';
    expect(await bookService.findById(_id)).toMatchObject({
      data: {
        id: '157ased',
        name: 'test',
      },
    });
    expect(cacheManagerMock.get).toHaveBeenNthCalledWith(1, `book_id:${_id}`);
    expect(cacheManagerMock.set).not.toHaveBeenCalled();
  });

  it('should return one book from db', async () => {
    const _id = '157ased-';
    expect(await bookService.findById(_id)).toMatchObject({
      data: {
        id: '157ased-',
        name: 'test',
      },
    });
    expect(cacheManagerMock.get).toHaveBeenNthCalledWith(2, `book_id:${_id}`);
    expect(cacheManagerMock.set).toHaveBeenCalled();
  });
});
