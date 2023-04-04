import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { genres } from './enum/bookgenres.enum';

export type BookDocuoment = HydratedDocument<Book>;

@Schema({ autoIndex: false, _id: false })
export class EditionDetails {
  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const editionDetailsSchema =
  SchemaFactory.createForClass(EditionDetails);

@Schema({ timestamps: true })
export class Book {
  @Prop({
    type: String,
    trim: true,
    minLength: 0,
    maxlength: 255,
    required: true,
    unique: true,
  })
  title: string;

  @Prop({
    type: String,
    trim: true,
    minLength: 0,
    maxlength: 255,
    required: true,
  })
  author: string;

  @Prop({ type: Number, required: true })
  pages: number;

  @Prop({ type: Date, required: true })
  publishDate: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  ordered: number;

  @Prop({ type: Number, required: true, min: 0, max: 5 })
  rate: number;

  @Prop({ type: [String], enum: genres, required: true })
  genre: string[];

  @Prop({ type: [editionDetailsSchema], required: true })
  editions: EditionDetails[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
