import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/movie.dto';
import { MovieRatings } from './entities/movieRatings.entity';
import { CreateMovieRatingDto } from './dto/movieRatings.dto';
import { Genre } from './entities/genre.entity';
import { User } from 'src/users/entities/user.entity';
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(MovieRatings) private movieRatingRepository: Repository<MovieRatings>,
    @InjectRepository(Genre) private genreRepository: Repository<Genre>,
  ) { }

  getAllMovies() {
    return this.movieRepository.find();
  }

  async getMovieById(id, relationsArray: string[] = []) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id
      },
      relations: relationsArray
    });
    if (movie) {
      return movie;
    }

    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  async createMovie(createMovieDto: CreateMovieDto) {
    const data = await this.movieRepository.create(createMovieDto);
    const genreEntities = await this.genreRepository.findBy({ id: In(createMovieDto.genreIds) });
    data.genre = genreEntities;
    const movie = await this.movieRepository.save(data);
    return movie;
  }

  async updateMovie(id, movieDto: CreateMovieDto) {
    await this.movieRepository.update(id, movieDto);
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

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.delete(id);
    if (!movie.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }


  async updateGenre(id: number, genreDto: GenreDto) {
    const genre = await this.genreRepository.findOne({
      where: { id },
    });
    if (!genre) {
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }
    genre.score = genreDto.score;
    this.genreRepository.save(genre);
    return genre;
  }
}