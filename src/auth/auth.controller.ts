import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthMemoryService } from './auth.memory.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthMemoryService) {}

  @ApiOperation({ summary: 'Login with username and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    type: LoginDto,
    examples: {
      Login: {
        value: {
          username: 'admin',
          password: 'admin',
        },
      },
    },
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Dados incorretos');
    }

    return this.authService.login(user);
  }
}
