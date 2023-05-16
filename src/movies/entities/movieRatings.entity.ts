import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieRatings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(() => Movie, movie => movie.ratings, { nullable:false ,onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

}