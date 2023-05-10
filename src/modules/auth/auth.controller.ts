import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { ForgetPasswordDto } from './dtos/forgetPassword.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req) {
    return this.authService.findById(req.user._id);
  }

  @Get('subscripe')
  @UseGuards(JwtAuthGuard)
  async subscripe(@Req() req) {
    return this.authService.subscripe(req.user._id);
  }

  @Post('changepassword')
  @UseGuards(JwtAuthGuard)
  changepassword(@Req() req, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(req.user._id, body);
  }

  @Post('login')
  @SkipThrottle()
  @UseGuards(LocalAuthGuard)
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Throttle(1, 10)
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
    return this.authService.resetPassword(req.user._id, body);
  }

  @Delete('deleteUser')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req) {
    return this.authService.deleteUser(req.user._id);
  }

  @Get('report')
  @UseGuards(JwtAuthGuard)
  report(@Req() req) {
    return this.authService.reportReq(req.user._id);
  }
}
