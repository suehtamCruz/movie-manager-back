import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { environment } from 'environments/environment';
import { UserService } from 'user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'user/dto/user.dto';
import { AuthMemoryService } from './auth.memory.service';
import { UserMemoryService } from 'user/user.memory.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    AuthMemoryService,
    UserMemoryService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
