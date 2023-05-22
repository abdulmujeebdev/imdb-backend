import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class MovieRatings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(() => Movie, movie => movie.ratings, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => User, user => user.ratings, { nullable: false, onDelete: 'CASCADE' })
  user: User;

}