/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { Book, BookSchema } from './book.schema';
import { BookService } from './book.service';
import { UniqueTitleValidation } from './decorators/uniqueTitle.decorator';

const AutoIncrement = require('mongoose-sequence');

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Book.name,
        useFactory: (connection: Connection) => {
          const schema = BookSchema;
          schema.plugin(AutoIncrement(connection), {
            inc_field: 'bookId',
          });
          schema.plugin(AutoIncrement(connection), {
            id: 'author_seq',
            inc_field: 'author_seq',
            reference_fields: ['author'],
          });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository, UniqueTitleValidation],
})
export class BookModule {}
