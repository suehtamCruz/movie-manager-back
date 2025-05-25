import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { UserModel } from './interfaces/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserMemoryService {
  private users: User[] = [
    {
      id: 1,
      name: 'Admin',
      pass: bcrypt.hashSync('admin', 10),
    },
  ];
  private idCounter = 2;

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async create(userData: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(userData.pass, 10);

    const newUser = new User();
    newUser.id = this.idCounter++;
    newUser.name = userData.name;
    newUser.pass = hashedPassword;

    this.users.push(newUser);
  }

  async login(user: UserModel): Promise<User> {
    const userBySearch = this.users.find((u) => u.name === user.name);

    if (!userBySearch) {
      throw new Error('Usuario não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(user.pass, userBySearch.pass);

    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    return { ...userBySearch };
  }

  async findByName(name: string): Promise<User | null> {
    const user = this.users.find((u) => u.name === name);
    return user ? { ...user } : null;
  }
}
