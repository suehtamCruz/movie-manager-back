import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @Column()
  pass: string;
}
