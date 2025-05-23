import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Movie } from './movie/dto/movie.dto';
import { MovieModule } from './movie/movie.module';
import { User } from './user/dto/user.dto';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'movie-manager',
      entities: [Movie, User],
      synchronize: true,
    }),
    MovieModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
