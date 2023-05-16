import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/movie.dto';
import { ElasticSearchService } from './elasticSearch.service';
import { UserGuard } from './../users/users.guard';
import { CreateMovieRatingDto } from './dto/movieRatings.dto';

@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService, private searchService: ElasticSearchService) { }

  @Get()
  async findAll() {
    return await this.moviesService.getAllMovies();
  }

  @Get('/search')
  async getAllMovies(@Query() queryParams) {
    const result = this.searchService.search('movies', { name: queryParams.query });
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Post()
  async create(@Body() createDto: CreateMovieDto) {
    const data = await this.moviesService.createMovie(createDto);
    await this.searchService.addDocument('movies', data);
    return data;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() movie: Movie): Promise<Movie> {
    const updatedMovie = await this.moviesService.updateMovie(id, movie);
    await this.searchService.updateDocument('movies', id, movie);
    return updatedMovie;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    this.moviesService.deleteMovie(id);
    return await this.searchService.deleteDocument('movies', id);
  }

  @Post(':id/ratings')
  async createRating(@Param('id') id: number, @Body() createDto: CreateMovieRatingDto) {
    const data = await this.moviesService.createRating(id, createDto);
    return data;
  }
}
