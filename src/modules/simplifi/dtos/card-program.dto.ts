import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CardProgramStatuses } from '../enums/cardProgram-statuses.enum';

import { merchantControlsForCardProgramDto } from './merchant-controls.dto';
import { PoiDto } from './poi.dto';
import { VelocityControlsDto } from './velocity-controls.dto';

export class FidelObj {
  @IsString()
  locationId: string;

  @IsString()
  apiKeySecretPath: string;
}

export class ParamsObj {
  @Type(() => FidelObj)
  @ValidateNested({ each: true })
  fidel: FidelObj;
}

export class ExtenalMerchantSourceObj {
  @IsString()
  @IsEnum(['FIDEL'])
  externalProvider: string;

  @Type(() => ParamsObj)
  @ValidateNested({ each: true })
  params: ParamsObj;
}

export class ConfigObj {
  @Type(() => PoiDto)
  @ValidateNested({ each: true })
  poi: PoiDto;

  @IsBoolean()
  loadMerchantsFromExternalSource: boolean;

  @IsNotEmpty()
  @Type(() => ExtenalMerchantSourceObj)
  @ValidateNested({ each: true })
  extenalMerchantSource: ExtenalMerchantSourceObj;

  @IsNotEmpty()
  @Type(() => merchantControlsForCardProgramDto)
  @ValidateNested({ each: true })
  merchantControls: merchantControlsForCardProgramDto;

  @IsNotEmpty()
  @Type(() => VelocityControlsDto)
  @ValidateNested({ each: true })
  velocityControls: VelocityControlsDto;
}

export class CardProgramDto {
  @IsNotEmpty()
  @Type(() => ConfigObj)
  @ValidateNested({ each: true })
  config: ConfigObj;

  @IsNotEmpty()
  @IsString()
  cardProgramTemplateUuid: string;

  @IsOptional()
  @IsString()
  @IsEnum(CardProgramStatuses)
  cardProgramStatus: string;

  @IsOptional()
  @IsBoolean()
  kycRequired: boolean;

  @IsOptional()
  @IsString()
  name: string;
}

export class CardProgramStatuse {
  @IsNotEmpty()
  @IsString()
  @IsEnum(CardProgramStatuses)
  cardProgramStatus: string;
}
