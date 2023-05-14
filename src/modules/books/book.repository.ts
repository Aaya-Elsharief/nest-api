import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, AggregatePaginateModel, ClientSession } from 'mongoose';
import { IServiceInterface } from 'src/Interfaces/IService.interface';

import { BOOK_MODEL } from './interfaces/book.interface';
import { BookRateText } from './constants/bookRateText-constants';
import { Book } from './book.schema';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(BOOK_MODEL)
    private readonly bookModel: PaginateModel<Book>,
    @InjectModel(BOOK_MODEL)
    private readonly aggBookModel: AggregatePaginateModel<any>,
  ) {}

  async create(book: Book): Promise<IServiceInterface> {
    const createBook = await this.bookModel.create(book);
    return { data: createBook.save() };
  }

  async updateOne(_filter, _update): Promise<IServiceInterface> {
    const createBook = this.bookModel.updateOne(_filter, _update);
    return { data: createBook };
  }

  async findOne(_filter: any, _projection?: any): Promise<IServiceInterface> {
    const data = this.bookModel.findOne(_filter, _projection);
    return { data };
  }

  async updateMany(
    _filter,
    _update,
    _options,
    session: ClientSession,
  ): Promise<IServiceInterface> {
    let data: any;
    await session.withTransaction(async () => {
      this.bookModel.updateMany(_filter, _update, _options);
      this.bookModel.deleteOne(_filter);

      return { data: { message: 'trans done' } };
    });
    await session.endSession();
    return { data };
  }

  async listPaginate(_query, _options): Promise<IServiceInterface> {
    const data = await this.bookModel.paginate(_query, _options);
    return { data };
  }

  async listAggregatePaginate(
    groupKey,
    sumKey,
    _options,
  ): Promise<IServiceInterface> {
    const pipeline = [{ $group: { _id: groupKey, total: { $sum: sumKey } } }];
    const aggregate = this.bookModel.aggregate(pipeline);
    const data = await this.aggBookModel.aggregatePaginate(aggregate, _options);
    return { data };
  }

  async recentPublishAggregate(_options: any): Promise<IServiceInterface> {
    const pipeline: any = [
      { $sort: { publishDate: -1 } },
      { $limit: 10 },
      {
        $addFields: {
          lastGenre: { $last: '$genre' },
          genresNum: { $size: '$genre' },
        },
      },
      {
        $project: {
          _id: 0,
          publishDate: 1,
          title: 1,
          bookAge: 1,
          lastGenre: 1,
          genresNum: 1,
        },
      },
    ];

    const aggregate = this.bookModel.aggregate(pipeline);
    const data = await this.aggBookModel.aggregatePaginate(aggregate, _options);
    return { data };
  }

  async bookRateCheck(_options: any): Promise<IServiceInterface> {
    const pipeline: any = [
      { $sort: { rate: -1 } },
      {
        $addFields: {
          rateWords: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [{ $gte: ['$rate', 4] }],
                  },
                  then: BookRateText.EXCELLENT,
                },
                {
                  case: {
                    $and: [{ $gte: ['$rate', 3] }, { $lt: ['$rate', 4] }],
                  },
                  then: BookRateText.VERY_GOOD,
                },
                {
                  case: {
                    $and: [{ $gte: ['$rate', 2] }, { $lt: ['$rate', 3] }],
                  },
                  then: BookRateText.GOOD,
                },
                {
                  case: {
                    $and: [{ $gte: ['$rate', 1] }, { $lt: ['$rate', 2] }],
                  },
                  then: BookRateText.POOR,
                },
                {
                  case: {
                    $and: [{ $gte: ['$rate', 0] }, { $lt: ['$rate', 1] }],
                  },
                  then: BookRateText.VERY_POOR,
                },
              ],
              default: BookRateText.NOT_RATED,
            },
          },
        },
      },
      { $project: { title: 1, rate: 1, rateWords: 1 } },
    ];

    const aggregate = this.bookModel.aggregate(pipeline);
    const data = await this.aggBookModel.aggregatePaginate(aggregate, _options);
    return { data };
  }

  async bookPublisheByTime(_options: any): Promise<IServiceInterface> {
    const pipeline: any = [
      { $sort: { publishDate: -1 } },
      {
        $group: {
          _id: {
            month: { $month: '$publishDate' },
            year: { $year: '$publishDate' },
          },
          authorsSet: { $addToSet: '$author' },
          publishedBooks: {
            $push: {
              title: { $concat: [{ $toString: '$price' }, ' - ', '$title'] },
              types: { $concatArrays: ['$genre', ['sth']] },
              date: {
                $dateToString: { format: '%Y-%m-%d', date: '$publishDate' },
              },
              UpdatedEditions: {
                $ifNull: [
                  {
                    $map: {
                      input: '$editions',
                      as: 'edition',
                      in: { $add: ['$$edition.quantity', 25] },
                    },
                  },
                  '$$REMOVE',
                ],
              },
            },
          },
          titlesOnly: { $push: '$title' },
        },
      },
      {
        $addFields: {
          allauthors: { $setUnion: ['$authorsSet', ['this is arr', 'ele2']] },
        },
      },
    ];
    const aggregate = this.bookModel.aggregate(pipeline);
    const data = await this.aggBookModel.aggregatePaginate(aggregate, _options);
    return { data };
  }

  async authorBooks(_options: any): Promise<IServiceInterface> {
    const pipeline: any = [
      {
        $project: {
          _id: 0,
          author: 1,
          title: 1,
          editinsCount: {
            $cond: [
              { $isArray: '$editions' },
              { $size: '$editions' },
              '$$REMOVE',
            ],
          },
          validEditions: {
            $ifNull: [
              {
                $filter: {
                  input: '$editions',
                  as: 'edition',
                  cond: { $lt: ['$$edition.age', 5] },
                },
              },
              'No valid Editions',
            ],
          },
          isgenresTrue: { $allElementsTrue: '$genre' },
        },
      },
    ];
    const aggregate = this.bookModel.aggregate(pipeline);

    const data = await this.aggBookModel.aggregatePaginate(aggregate, _options);
    return { data };
  }

  async booksOwners(_options: any): Promise<IServiceInterface> {
    const pipeline: any = [
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'ownerInfo',
        },
      },
      { $unwind: '$ownerInfo' },
      {
        $project: {
          _id: 0,
          title: 1,
          ownerName: '$ownerInfo.username',
        },
      },
    ];
    const aggregate = this.bookModel.aggregate(pipeline);
    const data = await this.aggBookModel.aggregatePaginate(aggregate, _options);
    return { data };
  }
}
