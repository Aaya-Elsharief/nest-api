import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { IsMatchPassword } from 'src/modules/users/decorators/isMatchPassword.decorator';
const datePattern = /^\d{1,2}([-/.])\d{1,2}\1\d{1,4}$/;

export class ChangePasswordDto {
  @IsNotEmpty()
  @Length(8, 18)
  currentPassword: string;

  @IsNotEmpty()
  @Length(8, 18)
  @Matches(datePattern)
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @Length(8, 18)
  @IsMatchPassword('newPassword')
  @ApiProperty()
  confirmPassword: string;
}
