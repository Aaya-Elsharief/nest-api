import { IsEnum, IsNotEmpty } from 'class-validator';

import { attachementResourseConfig } from '../constants/attachmentResourceConfig';

export class UploadFileDto {
  @IsNotEmpty()
  @IsEnum(Object.keys(attachementResourseConfig))
  path: string;
}
