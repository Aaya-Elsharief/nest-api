import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ForgetPasswordDto } from './dtos/forgetPassword.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req) {
    return this.authService.findById(req.user._id);
  }

  @Post('changepassword')
  @UseGuards(JwtAuthGuard)
  changepassword(@Req() req, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(req.user._id, body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('forgetpassword')
  forgetpassword(@Body() body: ForgetPasswordDto) {
    return this.authService.forgetPassword(body.email);
  }

  @Post('resetpassword')
  @UseGuards(JwtAuthGuard)
  resetPassword(@Req() req, @Body() body: ResetPasswordDto) {
    console.log('body: ', body);
    console.log('req: ', req.user._id);
    return this.authService.resetPassword(req.user._id, body);
  }

  // @Post('test')
  // test(@Body() body: any) {
  //   throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED_ERROR);
  // }
}
