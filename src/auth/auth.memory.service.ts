import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMemoryService } from '../user/user.memory.service';
import { User } from '../user/dto/user.dto';

@Injectable()
export class AuthMemoryService {
  constructor(
    private userService: UserMemoryService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.login({
        name: username,
        pass: password,
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
      },
    };
  }

  async validateToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findByName(payload.username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
