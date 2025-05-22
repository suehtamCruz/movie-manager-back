import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Movie } from './dto/movie.dto';
import { MovieModel } from './interfaces/movie.model';
import { MovieService } from './movie.service';

@ApiTags('movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'Return all movies', type: [Movie] })
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new movie',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              rate: { type: 'number' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created',
    type: Movie,
  })
  async create(@Body() movie: MovieModel): Promise<Movie> {
    return this.movieService.create(movie);
  }
}
