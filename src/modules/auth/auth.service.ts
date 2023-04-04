import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IServiceInterface } from 'src/Interfaces/IService.interface';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { ValidationErrorCodes } from 'src/constants/validation-error-codes';

import { User } from '../users/interfaces/user.interface';
import { UserService } from '../users/user.service';
import { RegisterDto } from '../auth/dtos/register.dto';

import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userSercive: UserService,
  ) {}

  async validateUser(findBy: any, password: string): Promise<User> {
    const { data } = await this.userSercive.findUser(findBy, {});
    if (data && (await bcrypt.compare(password, data.password))) {
      const { password, ...result } = data;
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
    this.sendEmail(email, resetURL);
    return { data: 'Check your Email' };
  }

  async sendEmail(email: string, url: string): Promise<IServiceInterface> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'tito.gorczany@ethereal.email',
        pass: '8R6WJZ2tGRREX3y75V',
      },
    });
    // console.log('transporter: ', transporter);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '<nestjs@example.com>',
      to: email,
      subject: 'Reset password',
      text: `Hello world? \n ${url}`,
      html: '<b>Hello world?</b> ' + `<a href=${url}>Reset password </a>`,
    });
    // console.log('info: ', info);

    return { data: info };
  }
}