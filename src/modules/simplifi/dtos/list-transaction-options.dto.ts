import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsValidDate } from 'src/decorators/isvalid-date';

export enum allowedSortBy {
  'transactionDate',
  'billAmount',
  'transactionAmount',
}
export enum sortDirections {
  'ASC',
  'DESC',
}

export enum TransactionTypes {
  'Auth',
  'Rev',
  'Settled',
  'Refund',
  'Load',
  'Unload',
}

export class BillCurrencyObj {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  defaultFractionDigits: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  numericCode: number;

  @IsOptional()
  @IsString()
  currencyCode: string;

  @IsOptional()
  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  symbol: string;

  @IsOptional()
  @IsString()
  numericCodeAsString: string;
}

export class TransactionBase {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  page: 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  size: 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  billAmount: 0;

  @IsOptional()
  @IsString()
  @IsEnum(allowedSortBy)
  sortBy: string;

  @IsOptional()
  @IsString()
  @IsEnum(sortDirections)
  sortDirection: string;

  @IsOptional()
  @IsString()
  userUuid: string;

  @IsOptional()
  @IsString()
  cardUuid: string;

  @IsOptional()
  @IsValidDate()
  startDate: string;

  @IsOptional()
  @IsValidDate()
  endDate: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  cardProgramUuids: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(TransactionTypes, { each: true })
  transactionType: string[];
}

export class TransactionBodyDto extends PartialType(TransactionBase) {
  @IsOptional()
  @Type(() => BillCurrencyObj)
  @ValidateNested({ each: true })
  BillCurrency: BillCurrencyObj;
}

export class TransactionParamsDto extends PartialType(TransactionBase) {
  @IsOptional()
  @IsString()
  BillCurrency: string;
}
