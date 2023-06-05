import { Transform, Type } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';

import { ToBoolean } from '../decorators/toBoolean';
import { BooksSortBy } from '../enum/booksSortBy.enum';

export class PaginateDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @ToBoolean()
  paginated: boolean;

  @IsOptional()
  // @Transform(({ value }) => value.toLowerCase())
  @IsEnum(BooksSortBy)
  sortBy: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) => (value >= 0 ? 1 : -1))
  @IsIn([1, -1])
  sort: number;
}
