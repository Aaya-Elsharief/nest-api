import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  _id: ObjectId;
}
