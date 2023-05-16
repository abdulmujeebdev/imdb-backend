import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ElasticSearchService } from './elasticSearch.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '@nestjs/config';
import { MovieRatings } from './entities/movieRatings.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Movie, MovieRatings]),
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
  providers: [MoviesService, ElasticSearchService],
})
export class MoviesModule { }