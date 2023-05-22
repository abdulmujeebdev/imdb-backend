import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ElasticSearchService } from './elasticSearch.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '@nestjs/config';
import { MovieRatings } from './entities/movieRatings.entity';
import { Countries } from './entities/countries.entity';
import { Genre } from './entities/genre.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { MovieRatingsService } from './movieRatings.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Movie, MovieRatings, Countries, Genre, User]),
    ElasticsearchModule.register({
      node: process.env.ELASTIC_SEARCH_HOST,
      auth: {
        username: process.env.ELASTIC_SEARCH_USERNAME,
        password: process.env.ELASTIC_SEARCH_PASSWORD
      },
      tls: { rejectUnauthorized: false }
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, ElasticSearchService, UsersService, MovieRatingsService],
})
export class MoviesModule { }