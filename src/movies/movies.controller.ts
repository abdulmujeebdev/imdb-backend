import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/movie.dto';
import { ElasticSearchService } from './elasticSearch.service';
import { UserGuard } from './../users/users.guard';

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

  @Post('/:id/rating')
  @UseGuards(UserGuard)
  async rateMovie(@Request() request, @Param('id') id: number) {
    const movie = this.moviesService.getMovieById(id);
    const authUserId = request.user.sub;
    return authUserId;
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
}
