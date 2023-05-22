import { User } from "src/users/entities/user.entity";
import { Movie } from "../entities/movie.entity";

export class CreateMovieRatingDto {
    public comments: string;
    public rating: number;
    public user: User;
    public movie: Movie;
}