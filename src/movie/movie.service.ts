import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './dto/movie.dto';
import { MovieModel } from './interfaces/movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async create(movieData: MovieModel): Promise<Movie> {
    const movie = new Movie();
    movie.Name = movieData.name;
    movie.Description = movieData.description;
    movie.Rate = movieData.rate;
    return this.movieRepository.save(movie);
  }

  async delete(movieId: number): Promise<void> {
    await this.movieRepository.delete(movieId);
  }
}
