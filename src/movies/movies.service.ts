import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) { }

  // find all
  getAllMovies() {
    return this.movieRepository.find();
  }

  // find by id
  async getMovieById(id) {
    const movie = await this.movieRepository.findOne({where: {
      id: id
    }});
    if (movie) {
      return movie;
    }

    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  // // create
  async createMovie(createMovieDto: CreateMovieDto) {
    const data = await this.movieRepository.create(createMovieDto);
    await this.movieRepository.save(data);

    return data;
  }

  // // update
  async updateMovie(id, post: CreateMovieDto) {
    await this.movieRepository.update(id, post);
    const updatedMovie = await this.movieRepository.findOne({
      where:{
        id
      }
    });
    if (updatedMovie) {
      return updatedMovie;
    }

    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  // delete
  async deleteMovie(id: number) {
    const movie = await this.movieRepository.delete(id);
    if (!movie.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }
}