import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './dto/user.dto';
import { UserModel } from './interfaces/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.pass, 10);

    const newUser = this.userRepository.create({
      name: user.name,
      pass: hashedPassword,
    });

    await this.userRepository.save(newUser);
  }

  async login(user: UserModel): Promise<User> {
    const userBySearch = await this.userRepository.findOneBy({
      name: user.name,
    });
    if (!userBySearch) {
      throw new Error('Usuario não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(user.pass, userBySearch.pass);

    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    return userBySearch;
  }

  async findByName(name: string): Promise<User | null> {
    return this.userRepository.findOneBy({ name });
  }
}
