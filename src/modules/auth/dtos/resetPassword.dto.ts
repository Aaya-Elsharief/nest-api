import { PickType } from '@nestjs/swagger';

import { ChangePasswordDto } from './changePassword.dto';

// export class ResetPasswordDto implements Pick {

// }

export class ResetPasswordDto extends PickType(ChangePasswordDto, [
  'newPassword',
  'confirmPassword',
]) {}
