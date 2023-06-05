import { parse } from 'path';

import { BadRequestException } from '@nestjs/common';

import { ErrorCodes } from '../../../constants/error-codes';
import { attachementResourseConfig } from '../constants/attachmentResourceConfig';

export const imageOrDocFileFilter = (req, file, cb) => {
  const resourcePath = req.params.path;
  const { ext } = parse(file.originalname);

  const acceptableCongfig = attachementResourseConfig[resourcePath];

  if (
    !acceptableCongfig.acceptableExtensions.includes(ext.toLocaleLowerCase())
  ) {
    // console.log('acceptableCongfig: ', acceptableCongfig.acceptableExtensions);
    return cb(new BadRequestException(ErrorCodes.UNSUPPORTED_FILE_EXT), null);
  }

  // check size based on myResourcePath
  const sizeInBytes = parseInt(req.headers['content-length']);
  const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
  if (sizeInMB > acceptableCongfig?.maxFileSize) {
    return cb(new BadRequestException(ErrorCodes['LIMIT_FILE_SIZE']), false);
  }

  cb(null, true);
};
