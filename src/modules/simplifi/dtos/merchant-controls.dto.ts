import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsOptional, IsString } from 'class-validator';

export class MerchantsObj {
  mid: string;
}

export class BlackListObj {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @Type(() => MerchantsObj)
  @ValidateNested({ each: true })
  merchants: MerchantsObj[];
}

export class WhiteListObj {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @Type(() => MerchantsObj)
  @ValidateNested({ each: true })
  merchants: MerchantsObj[];
}

export class MerchantControlsDto {
  @IsArray()
  @IsOptional()
  @Type(() => MerchantsObj)
  @ValidateNested({ each: true })
  whiteList?: MerchantsObj[];

  @IsArray()
  @IsOptional()
  @Type(() => MerchantsObj)
  @ValidateNested({ each: true })
  blackList?: MerchantsObj[];
}

export class merchantControlsForCardProgramDto {
  @IsOptional()
  @Type(() => WhiteListObj)
  @ValidateNested({ each: true })
  whiteList?: WhiteListObj;

  @IsOptional()
  @Type(() => BlackListObj)
  @ValidateNested({ each: true })
  blackList?: BlackListObj;
}
