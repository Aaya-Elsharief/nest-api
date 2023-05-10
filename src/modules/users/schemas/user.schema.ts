import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocuoment = HydratedDocument<User>;

@Schema({ autoIndex: false, _id: false })
export class BuildingDetails {
  @Prop({
    type: String,
    required: true,
    length: 6,
    trim: true,
  })
  code: string;

  @Prop({ type: Number, required: true, min: 0, max: 10 })
  floor: number;
}
const BuildingDetailsSchema = SchemaFactory.createForClass(BuildingDetails);

@Schema({ autoIndex: false, _id: false })
export class addressDetails {
  @Prop({ type: String, required: true, trim: true })
  city: string;

  @Prop({ type: String, required: true, trim: true })
  street: string;

  @Prop({ type: [BuildingDetailsSchema], required: true })
  building: BuildingDetails[];
}

const addressDetailsSchema = SchemaFactory.createForClass(addressDetails);

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  password: string;

  @Prop({ type: [addressDetailsSchema], required: true })
  address: addressDetails[];

  @Prop({ type: Number, required: true, min: 13, max: 50 })
  age: number;

  @Prop({ type: String, enum: ['free', 'premium'], default: 'free' })
  status: string;

  @Prop({ type: Date, default: null })
  subscriptionEnds: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  lastOne?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1, email: 1 }, { unique: true });
// UserSchema.index({ 'address.building': 1 });
// UserSchema.index({ username: 'text', email: 'text' });
// UserSchema.index(
//   { username: 1 },
//   { partialFilterExpression: { age: { $gte: 20 } } },
// );
UserSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 30 });
