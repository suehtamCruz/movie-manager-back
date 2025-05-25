import { Injectable } from '@nestjs/common';
import { Movie } from './dto/movie.dto';
import { MovieModel } from './interfaces/movie.model';

@Injectable()
export class MovieMemoryService {
  private movies: Movie[] = [];
  private idCounter = 1;

  async findAll(): Promise<Movie[]> {
    return [...this.movies];
  }

  async create(movieData: MovieModel): Promise<Movie> {
    const movie = new Movie();
    movie.Id = this.idCounter++;
    movie.Name = movieData.name;
    movie.Description = movieData.description;
    movie.Rate = movieData.rate;

    this.movies.push(movie);
    return { ...movie };
  }

  async delete(movieId: number): Promise<Movie[]> {
    const index = this.movies.findIndex((movie) => movie.Id === movieId);
    if (index !== -1) {
      this.movies.splice(index, 1);
    }
    console.log('deleting movie with id: ' + index);
    console.log(this.movies);
    return this.movies;
  }

  async findById(movieId: number): Promise<Movie | undefined> {
    const movie = this.movies.find((movie) => movie.Id === movieId);
    return movie ? { ...movie } : undefined;
  }

  async update(
    movieId: number,
    movieData: Partial<MovieModel>,
  ): Promise<Movie | undefined> {
    const index = this.movies.findIndex((movie) => movie.Id === movieId);
    if (index === -1) {
      return undefined;
    }

    const updatedMovie = { ...this.movies[index] };

    if (movieData.name !== undefined) {
      updatedMovie.Name = movieData.name;
    }
    if (movieData.description !== undefined) {
      updatedMovie.Description = movieData.description;
    }
    if (movieData.rate !== undefined) {
      updatedMovie.Rate = movieData.rate;
    }

    this.movies[index] = updatedMovie;
    return { ...updatedMovie };
  }
}
