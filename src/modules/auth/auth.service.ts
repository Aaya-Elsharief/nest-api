import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { IServiceInterface } from '../../Interfaces/IService.interface';
import { ValidationErrorCodes } from '../../constants/validation-error-codes';
import { sendEmail } from '../../helpers/sendEmail';
import { User } from '../users/interfaces/user.interface';
import { UserService } from '../users/user.service';
import { RegisterDto } from '../auth/dtos/register.dto';
import { UserLogsService } from '../userLogs/userLogs.service';

import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userSercive: UserService,
    private userLogsService: UserLogsService,
  ) {}

  async validateUser(findBy: any, password: string): Promise<User> {
    const { data } = await this.userSercive.findUser(findBy, {});
    if (data && (await bcrypt.compare(password, data.password))) {
      data.deletedAt ? this.userSercive.restoreUser(data._id) : null;
      const { password, ...result } = data;
      // console.log('result: ', result);
      return result;
    }

    return null;
  }

  async findByEmail(email: string): Promise<IServiceInterface> {
    return this.userSercive.findUser({ email }, {});
  }

  async findById(_id: string): Promise<IServiceInterface> {
    return this.userSercive.findUser({ _id }, { password: 0 });
  }

  async login(loginDto: any): Promise<IServiceInterface> {
    const payload = { _id: loginDto._doc._id, issudeAt: Date.now() };
    return { data: { token: this.jwtService.sign(payload) } };
  }

  async register(registerDto: RegisterDto): Promise<IServiceInterface> {
    const { password, ...data } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userSercive.create({ ...data, password: hashedPassword });
  }

  async changePassword(
    _id: string,
    changeDto: ChangePasswordDto,
  ): Promise<IServiceInterface> {
    if (!(await this.validateUser({ _id }, changeDto.currentPassword))) {
      throw new BadRequestException(ValidationErrorCodes['IsValidPassword']);
    } else {
      const { confirmPassword, newPassword } = changeDto;
      return await this.resetPassword(_id, { confirmPassword, newPassword });
    }
  }

  async resetPassword(
    _id: string,
    reseteDto: ResetPasswordDto,
  ): Promise<IServiceInterface> {
    const hashedPassword = await bcrypt.hash(reseteDto.newPassword, 10);
    await this.userSercive.updateOne({ _id }, { password: hashedPassword });
    return { data: 'Password change successfully' };
  }

  async forgetPassword(email: string): Promise<IServiceInterface> {
    const { data } = await this.userSercive.findUser({ email }, { _id: 1 });
    const payload = { _id: data._id };
    const link = 'something';
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    const resetURL = `/${link}?token=${token}`;
    sendEmail(email, resetURL, 'Reset password');
    return { data: 'Check your Email' };
  }

  async reportReq(_id: string): Promise<IServiceInterface> {
    return this.userLogsService.getReport(_id);
  }

  async deleteUser(_id: string): Promise<IServiceInterface> {
    return await this.userSercive.deleteUser(_id);
  }

  async subscripe(_id: string): Promise<IServiceInterface> {
    return await this.userSercive.subscripe(_id);
  }
}
