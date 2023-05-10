import { parse } from 'path';

import * as sharp from 'sharp';

import { renameFile } from './renameFile';

const sizes = [192, 180, 320];
export const resizeImages = async (
  path: string,
  files: Express.Multer.File[],
) => {
  const newFiles = [];
  for (const file of files) {
    const fileName = await `${renameFile(file.originalname)}`;

    if (file.mimetype.includes('image')) {
      const { ext, name } = parse(fileName);
      file['fileName'] = `${name}/origin${ext}`;
      newFiles.push(file);
      for (const size of sizes) {
        const newImg = { ...file };
        const imgBuffer = await sharp(file.buffer).resize(size).toBuffer();
        newImg.buffer = await imgBuffer;
        newImg['fileName'] = `${name}/${size}${ext}`;
        newFiles.push(newImg);
      }
    } else {
      file['fileName'] = fileName;
      newFiles.push(file);
    }
  }
  // console.log('newFiles: ', newFiles);
  return newFiles;
};
