import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';

export class VelocityControlListObj {
  @IsNotEmpty()
  @IsString()
  velocityAdapterKey: string;

  @IsString()
  name: string;
}

export class VelocityControlsDto {
  @IsString()
  activeVelocityAdapterKey: string;

  @IsNotEmpty()
  @IsArray()
  @Type(() => VelocityControlListObj)
  @ValidateNested({ each: true })
  velocityControlList: VelocityControlListObj[];
}
