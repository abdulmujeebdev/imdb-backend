import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/movie.dto';

@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Get()
  async findAll() {
    return await this.moviesService.getAllMovies();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  async create(@Body() createDto: CreateMovieDto) {
    return this.moviesService.createMovie(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
    return this.moviesService.updateMovie(id, movie);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.moviesService.deleteMovie(id);
  }
}
