import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IServiceInterface } from 'src/Interfaces/IService.interface';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';

import { User, UserDocuoment } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocuoment>,
  ) {}

  async findOne(_filter: any, _projection?: any): Promise<User> {
    return this.userModel.findOne(_filter, _projection).exec();
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const createUser = new this.userModel(registerDto);
    return createUser.save();
  }

  async updateOne(_filter, _update): Promise<IServiceInterface> {
    const changePasswordC = await this.userModel.updateOne(_filter, _update);
    return { data: changePasswordC };
  }
}
