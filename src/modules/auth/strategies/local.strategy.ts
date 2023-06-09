import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { ErrorCodes } from '../../../constants/error-codes';
import { User } from '../../users/interfaces/user.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.authService.validateUser({ email }, password);
    // console.log('user: ', user);
    if (!user) {
      throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED_ERROR);
    }
    return user;
  }
}
