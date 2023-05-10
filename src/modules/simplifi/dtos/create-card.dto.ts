import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum instruments {
  'VIRTUAL',
  'PHYSICAL',
  'VIRTUAL_AND_PHYSICAL',
  'CLIENT_CARD',
}
export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  userUuid: string;

  @IsNotEmpty()
  @IsString()
  cardProgramUuid: string;

  @IsNotEmpty()
  customerTitle: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(instruments)
  instrument: string;
}
