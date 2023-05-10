import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { IsValidDate } from 'src/decorators/isvalid-date';

export class CardQuerydto {
  @IsOptional()
  @IsString()
  userUuid?: string;

  @IsOptional()
  @IsValidDate()
  endDate?: string;

  @IsOptional()
  @IsValidDate()
  startDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pageSize?: number;
}
