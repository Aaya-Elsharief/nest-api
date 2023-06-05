import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

import { IsMatchPassword } from '../../users/decorators/isMatchPassword.decorator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @Length(8, 18)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  currentPassword: string;

  @IsNotEmpty()
  @Length(8, 18)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @Length(8, 18)
  @IsMatchPassword('newPassword')
  @ApiProperty()
  confirmPassword: string;
}
