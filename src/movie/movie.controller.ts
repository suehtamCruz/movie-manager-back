import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Movie } from './dto/movie.dto';
import { MovieModel } from './interfaces/movie.model';
import { MovieService } from './movie.service';

@ApiTags('movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'Return all movies', type: [Movie] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<Movie[]> {
    return await this.movieService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
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
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() movie: MovieModel): Promise<Movie> {
    return await this.movieService.create(movie);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully deleted',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Param('id') movieId: number): Promise<void> {
    await this.movieService.delete(movieId);
  }
}
