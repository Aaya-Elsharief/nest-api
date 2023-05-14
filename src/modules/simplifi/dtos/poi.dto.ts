import { IsOptional, IsBoolean } from 'class-validator';

export class PoiDto {
  @IsOptional()
  @IsBoolean()
  ecommerce: boolean | null;

  @IsOptional()
  @IsBoolean()
  atm: boolean | null;

  @IsOptional()
  @IsBoolean()
  pos: boolean | null;

  @IsOptional()
  @IsBoolean()
  international: boolean | null;

  @IsOptional()
  @IsBoolean()
  contactless: boolean | null;

  @IsOptional()
  @IsBoolean()
  dcc: boolean | null;
}
