import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IServiceInterface } from 'src/Interfaces/IService.interface';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';

import { User, UserDocuoment } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocuoment>) {
    // this.userModel.watch().on('change', (obj) => console.log(obj));
    const changeStream = this.userModel.watch([], {
      fullDocument: 'updateLookup',
    });

    changeStream.on('change', (obj) => {
      console.log(obj);
    });
  }

  // const changeStream = this.userModel.watch([], {
  //   fullDocument: 'updateLookup',
  // }); // <-- specialize using the cast

  // this.userModel.watch([], {
  //   fullDocument: 'updateLookup',
  // }).on('change', (obj) => {
  //   console.log(obj);
  // });

  async findOne(_filter: any, _projection?: any): Promise<User> {
    return this.userModel.findOne(_filter, _projection).exec();
  }

  async findAll(): Promise<any> {
    return this.userModel.find().lean();
  }

  async create(lastone: any, registerDto: RegisterDto): Promise<User> {
    const createUser = new this.userModel(registerDto);
    return createUser.save();
  }

  async updateOne(_filter, _update): Promise<IServiceInterface> {
    const updated = await this.userModel.updateOne(_filter, _update);
    return { data: updated };
  }

  async updateMany(_filter, _update): Promise<IServiceInterface> {
    const updated = await this.userModel.updateMany(_filter, _update);
    console.log('updated: ', updated);
    return { data: updated };
  }
}
