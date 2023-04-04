import { PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

import { BookDto } from './createBook.dto';

export class UpdateBookDto extends PartialType(BookDto) {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}
