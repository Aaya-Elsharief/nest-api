import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../users/user.module';
import { UniqueEmailValidation } from '../users/decorators/uniqueEmail.decorator';
import { uniqueUsernameValidation } from '../users/decorators/uniqueUsername.decorator';
import { EmailExistValidation } from '../users/decorators/isEmailExist.decorator';
import { PasswordMatchValidation } from '../users/decorators/isMatchPassword.decorator';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UniqueEmailValidation,
    uniqueUsernameValidation,
    EmailExistValidation,
    PasswordMatchValidation,
  ],
})
export class AuthModule {}
