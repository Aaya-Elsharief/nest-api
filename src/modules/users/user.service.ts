import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { IServiceInterface } from 'src/Interfaces/IService.interface';

import { RegisterDto } from '../auth/dtos/register.dto';

import { UserRepository } from './repositories/user.repository';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // onModuleInit() {
  //   this.schemaModel.collection.watch<SchemaDocument>().on('change', (e) => {
  //     console.log(e)
  //   })
  // }

  async create(registerDto: RegisterDto): Promise<IServiceInterface> {
    await this.userRepository.create('hello last', registerDto);
    return { data: { message: 'User created successfully' } };
  }

  async findUser(_filter, _projection): Promise<IServiceInterface> {
    const data = await this.userRepository.findOne(_filter, _projection);
    return { data };
  }
  async findAll(): Promise<IServiceInterface> {
    const data = await this.userRepository.findAll();
    return { data };
  }

  async updateOne(_filter, _update): Promise<IServiceInterface> {
    return await this.userRepository.updateOne(_filter, _update);
  }

  async updateStatus(): Promise<IServiceInterface> {
    return await this.userRepository.updateMany(
      { subscriptionEnds: { $lte: Date.now() } },
      {
        $set: {
          status: 'free',
        },
      },
    );
  }

  async deleteUser(_id): Promise<IServiceInterface> {
    return { data: await this.updateOne({ _id }, { deletedAt: Date.now() }) };
  }

  async restoreUser(_id): Promise<IServiceInterface> {
    return { data: await this.updateOne({ _id }, { deletedAt: null }) };
  }

  async subscripe(_id): Promise<IServiceInterface> {
    const subEnds = new Date().setDate(new Date().getDate() + 10);
    return {
      data: await this.updateOne(
        { _id },
        { subscriptionEnds: subEnds, status: 'premium' },
      ),
    };
  }
}
