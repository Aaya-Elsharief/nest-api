import { parse } from 'path';

export const renameFile = (fileName: string) => {
  const { name, ext } = parse(fileName);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  return name + '-' + `${uniqueSuffix}` + ext;
};
