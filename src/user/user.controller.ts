import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user.dto';
import { UserMemoryService } from './user.memory.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserMemoryService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users', type: [User] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data',
    required: true,
    examples: {
      user: {
        value: {
          name: 'John Doe',
          pass: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @Post()
  async create(@Body() user: CreateUserDto): Promise<void> {
    await this.userService.create(user);
  }
}
