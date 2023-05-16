import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/movie.dto';
import { MovieRatings } from './entities/movieRatings.entity';
import { CreateMovieRatingDto } from './dto/movieRatings.dto';

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
    const movie = await this.movieRepository.findOne({
      where: {
        id: id
      }
    });
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
      where: {
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

  async createRating(movieId, request: CreateMovieRatingDto): Promise<MovieRatings> {
    const movie = await this.getMovieById(movieId);
    const rating = new MovieRatings();
    rating.rating = request.rating;
    rating.movie = movie;
    if (rating.movie.ratings == null) {
      rating.movie.ratings = Array<MovieRatings>();
    }
    rating.movie.ratings.push(rating);
    await this.movieRepository.save(movie);

    return rating;
  }
}