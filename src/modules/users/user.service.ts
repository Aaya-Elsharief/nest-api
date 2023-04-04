import { Injectable } from '@nestjs/common';
import { IServiceInterface } from 'src/Interfaces/IService.interface';

import { RegisterDto } from '../auth/dtos/register.dto';

import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(registerDto: RegisterDto): Promise<IServiceInterface> {
    await this.userRepository.create(registerDto);
    return { data: { message: 'User created successfully' } };
  }

  async findUser(_filter, _projection): Promise<IServiceInterface> {
    const data = await this.userRepository.findOne(_filter, _projection);
    return { data };
  }

  async updateOne(_filter, _update): Promise<IServiceInterface> {
    const changePasswordC = await this.userRepository.updateOne(
      _filter,
      _update,
    );
    return changePasswordC;
  }

  // async findbyEmail(email: string): Promise<IServiceInterface> {
  //   try {
  //     const data = await this.userRepository.findOne({ email });
  //     return { data };
  //   } catch (exception) {
  //     throw new InternalServerErrorException(ErrorCodes.UNEXPECTED_ERROR);
  //   }
  // }

  // async findbyUsername(username: string): Promise<IServiceInterface> {
  //   const data = await this.userRepository.findOne({ username });
  //   return { data };
  // }
}
