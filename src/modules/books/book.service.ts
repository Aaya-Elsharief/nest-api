import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import mongoose, { ClientSession, Types } from 'mongoose';
import { IServiceInterface } from 'src/Interfaces/IService.interface';

import { BookRepository } from './book.repository';
import { Book, EditionDetails } from './book.schema';
import { BookSchemaSortByAllowed } from './constants/bookSchemaSortByAllowed';
import { BookDto } from './dtos/createBook.dto';
import { PaginateDto } from './dtos/paginate.dto';
import { UpdateBookDto } from './dtos/updateBook.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookrepository: BookRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getUsers() {
    await this.cacheManager.set('_id:dffff', 'new id');
    return this.cacheManager.get('_id:dffff');
  }

  async create(bookdto: BookDto): Promise<IServiceInterface> {
    const editions: EditionDetails[] = [];
    bookdto.editions.forEach((obj) => {
      const edition: EditionDetails = { age: obj.age, quantity: obj.quantity };
      editions.push(edition);
    });
    const genres: string[] = [];
    bookdto.genre.forEach((val) => {
      genres.push(val);
    });
    const book: Book = {
      title: bookdto.title,
      author: bookdto.author,
      pages: bookdto.pages,
      publishDate: bookdto.publishDate,
      price: bookdto.price,
      ordered: bookdto.ordered,
      rate: bookdto.rate,
      editions: editions,
      genre: bookdto.genre,
      owner: new Types.ObjectId(bookdto.owner),
    };
    await this.bookrepository.create(book);
    return { data: { message: 'Book added successfully' } };
  }

  async findByTitle(title: string): Promise<IServiceInterface> {
    return await this.bookrepository.findOne({ title });
  }

  async findById(_id: string): Promise<IServiceInterface> {
    const key = `book_id:${_id}`;
    let book = await this.cacheManager.get<Book>(key);
    if (!book) {
      book = (await this.bookrepository.findOne({ _id })).data;
      await this.cacheManager.set(key, book);
    }
    return { data: book };
  }

  async updateBook(updateBookDto: UpdateBookDto): Promise<IServiceInterface> {
    const { _id, ..._update } = updateBookDto;
    const key = `book_id:${_id}`;
    const updatedBook = await this.bookrepository.updateOne({ _id }, _update);
    await this.cacheManager.del(key); //update
    return updatedBook;
  }

  async updateAuthor(): Promise<IServiceInterface> {
    const session: ClientSession = await this.connection.startSession();
    const _filter = { author: 'Arthur Conan Doyle1' };
    const _update = { $inc: { pages: 120 } };
    const _options = { upsert: true };

    return await this.bookrepository.updateMany(
      _filter,
      _update,
      _options,
      session,
    );
  }

  //paginaion
  async findAll(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };

    const key = `all_books:${_options.limit},${_options.page},${
      _options.pagination
    },${Object.keys(_options.sort)}${Object.values(_options.sort)},${
      _options.allowDiskUse
    }`;

    let books = await this.cacheManager.get<Book[]>(key);
    if (!books) {
      books = await (await this.bookrepository.listPaginate({}, _options)).data;
      await this.cacheManager.set(key, books);
    }
    // console.log('key: ', key);

    return { data: books };
  }

  sortBooksBy(sortBy, sort) {
    const obj = {};
    if (Object.values(BookSchemaSortByAllowed).includes(sortBy)) {
      obj[sortBy] = sort || 1;
      return obj;
    } else {
      obj[BookSchemaSortByAllowed.TITLE] = sort || 1;
      return obj;
    }
  }

  // aggregation pipeline
  async findAllAuthors(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const groupKey = {
      author: '$author',
      price: '$price',
      genre: { $first: '$genre' },
    };
    const sumKey = 1;
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };

    return {
      data: await this.bookrepository.listAggregatePaginate(
        groupKey,
        sumKey,
        _options,
      ),
    };
  }

  async countBooks(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const groupKey = null;
    const sumKey = 1;
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };

    return await this.bookrepository.listAggregatePaginate(
      groupKey,
      sumKey,
      _options,
    );
  }

  async totalProfit(): Promise<IServiceInterface> {
    const groupKey = '$author';
    const sumKey = { $multiply: ['$price', '$ordered'] };
    const _options = {
      limit: 10,
      page: 1,
    };
    return await this.bookrepository.listAggregatePaginate(
      groupKey,
      sumKey,
      _options,
    );
  }

  async recentPublished(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };
    return await this.bookrepository.recentPublishAggregate(_options);
  }

  async rateCheck(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };
    return await this.bookrepository.bookRateCheck(_options);
  }

  async booksTime(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };

    return await this.bookrepository.bookPublisheByTime(_options);
  }

  async authorBooks(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };

    return await this.bookrepository.authorBooks(_options);
  }

  async booksOwners(paginateDto: PaginateDto): Promise<IServiceInterface> {
    const _options = {
      limit: paginateDto.limit || 10,
      page: paginateDto.page || 1,
      pagination:
        paginateDto.paginated != undefined ? paginateDto.paginated : true,
      sort: this.sortBooksBy(paginateDto.sortBy, paginateDto.sort),
      allowDiskUse: true,
    };

    return await this.bookrepository.booksOwners(_options);
  }
}
