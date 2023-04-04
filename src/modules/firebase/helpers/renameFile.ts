import { parse } from 'path';

export const renameFile = (file: any) => {
  const { name, ext } = parse(file.originalname);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return name + '-' + uniqueSuffix + ext;
};
