import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { MerchantControlsDto } from './merchant-controls.dto';
import { PoiDto } from './poi.dto';
import { VelocityControlsDto } from './velocity-controls.dto';

export class CardControlObj {
  @IsOptional()
  @Type(() => PoiDto)
  @ValidateNested({ each: true })
  poi: PoiDto;

  @IsOptional()
  @Type(() => VelocityControlsDto)
  @ValidateNested({ each: true })
  velocityControls: VelocityControlsDto;

  @IsOptional()
  @Type(() => MerchantControlsDto)
  @ValidateNested({ each: true })
  merchantControls: MerchantControlsDto;
}

export class CardControlDto {
  @IsNotEmpty()
  @IsString()
  cardUuid: string;

  @IsNotEmpty()
  @IsString()
  cardProgramUuid: string;

  @IsNotEmpty()
  @Type(() => CardControlObj)
  @ValidateNested({ each: true })
  cardControl: CardControlObj;
}
