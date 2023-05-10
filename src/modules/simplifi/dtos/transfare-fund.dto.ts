import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransfareFundDto {
  @IsNotEmpty()
  @IsString()
  sourceCardProgramUuid: string;

  @IsNotEmpty()
  @IsString()
  destCardProgramUuid: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  amount: number;
}
