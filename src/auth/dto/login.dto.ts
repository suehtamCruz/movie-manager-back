import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The username',
    example: 'john.doe',
  })
  username: string;

  @ApiProperty({
    description: 'The password',
    example: 'password123',
  })
  password: string;
}
