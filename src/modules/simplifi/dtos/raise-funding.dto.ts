import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export enum Purposes {
  'OTHER',
  'TRAVEL_AGENCY',
  'TRAVEL_MANAGEMENT_COMPANY',
  'DESTINATION_MANAGEMENT_COMPANY',
  'INSURANCE_THIRD_PARTY_ADMINISTRATOR',
  'INSURANCE_COMPANY',
  'TO_LOAD_THE_POOL_ACCOUNT',
}

export enum SourceFunds {
  'OTHER',
  'TRADING_ACTIVITIES',
  'RETAINED_PROFITS',
  'INVESTMENT',
}

export enum TransactionTypes {
  'DEBIT',
  'CREDIT',
}

export class RaiseFundingDto {
  @IsNotEmpty()
  @IsString()
  cardProgramUuid: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  attachments: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(SourceFunds)
  sourceFunds: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionTypes)
  transactionType: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Purposes)
  purpose: string;
}
