import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FundingSourceDto {
  @IsOptional()
  @IsString()
  thirdPartyId: string;

  @IsNotEmpty()
  @IsString()
  fundingSource: string;
}
