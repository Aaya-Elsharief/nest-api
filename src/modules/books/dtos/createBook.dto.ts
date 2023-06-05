import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { IsValidDate } from '../../../decorators/isvalid-date';
import { IsUniqueTitle } from '../decorators/uniqueTitle.decorator';
import { genres } from '../enum/bookgenres.enum';

export class EditionDetails {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  age: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  quantity: number;
}

export class BookDto {
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  @IsUniqueTitle()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  @ApiProperty()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  pages: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  ordered: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty()
  rate: number;

  @IsNotEmpty()
  @Type(() => EditionDetails)
  @ValidateNested({ each: true })
  @ApiProperty()
  editions: EditionDetails[];

  @IsNotEmpty()
  @IsValidDate()
  @ApiProperty()
  publishDate: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(genres, { each: true })
  @ApiProperty()
  genre: string[];

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  owner: string;
}
