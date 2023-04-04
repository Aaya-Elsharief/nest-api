import { Types, Document } from 'mongoose';

export const BOOK_MODEL = 'Book';

interface Editiondetails {
  age: number;
  quantity: number;
}

export default interface Book extends Document {
  title: string;
  author: string;
  pages: number;
  genre: string;
  price: number;
  ordered: number;
  rate: number;
  publishDate: string;
  owner: Types.ObjectId;
  editions: Editiondetails[];
}
