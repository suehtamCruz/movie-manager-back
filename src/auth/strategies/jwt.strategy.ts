import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { environment } from 'environments/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByName(payload.username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
