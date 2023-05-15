import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieRatings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  star_rating: number;

  @Column({ nullable: true })
  comments: string;

  @Column()
  movie_id: number;

}