import { IsNotEmpty, IsEmail } from 'class-validator';

import { IsExistEmail } from '../../users/decorators/isEmailExist.decorator';

export class ForgetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @IsExistEmail()
  email: string;
}
