import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { UserModule } from '../users/user.module';
import { UniqueEmailValidation } from '../users/decorators/uniqueEmail.decorator';
import { uniqueUsernameValidation } from '../users/decorators/uniqueUsername.decorator';
import { EmailExistValidation } from '../users/decorators/isEmailExist.decorator';
import { PasswordMatchValidation } from '../users/decorators/isMatchPassword.decorator';
import { UserLogsModule } from '../userLogs/userLogs.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    UserLogsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        limit: 20,
        ttl: 10,
      }),
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
    ThrottlerGuard,
  ],
})
export class AuthModule {}
