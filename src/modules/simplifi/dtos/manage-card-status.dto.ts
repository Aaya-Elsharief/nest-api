import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum statuses {
  'PENDING',
  'ISSUED',
  'PROVISIONED',
  'ACTIVATED',
  'DISABLED',
  'LOCKED',
  'REPLACED',
  'REJECTED',
}
export enum reasons {
  'ALL_GOOD',
  'STOLEN',
  'LOST',
  'FRAUDULENCE',
  'SECURITY_VIOLATION',
  'RESTRICTED',
  'VOIDED',
}

export class ManageCardStatusDto {
  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(reasons)
  reason: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(statuses)
  status: string;
}
