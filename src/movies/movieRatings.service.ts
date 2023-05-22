import { Injectable } from "@nestjs/common";
import { MovieRatings } from "./entities/movieRatings.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MoviesService } from "./movies.service";
import { CreateMovieRatingDto } from "./dto/movieRatings.dto";
import { User } from "src/users/entities/user.entity";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MovieRatingsService {
    constructor(
        @InjectRepository(MovieRatings) private repository: Repository<MovieRatings>,
        @InjectRepository(Movie) private movieRepository: Repository<Movie>,
        private movieService: MoviesService
    ) {

    }

    async createRating(movieId, request: CreateMovieRatingDto, user: User) {
        const movie = await this.movieService.getMovieById(movieId, ['ratings']);
        request.movie = movie;
        request.user = user;
        const rating = await this.repository.save(this.repository.create(request))
        movie.ratings.push(rating);

        // Calculate Movie Rating
        movie.rating = this.getOverallRating(movie.ratings);
        await this.movieRepository.save(movie);

        return rating;
    }

    getOverallRating(reviews): number {
        const ratingsSum = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = ratingsSum / reviews.length;
        return averageRating;
    }

    async checkReviewExists(userId: number, movieId: number) {
        return await this.repository.findOne({
            where: { user: { id: userId }, movie: { id: movieId } },
        })
    }

}