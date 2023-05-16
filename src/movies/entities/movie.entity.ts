import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MovieRatings } from './movieRatings.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  release_date: string;

  @Column()
  ticket_price: number;

  @Column()
  country: string;

  @Column()
  genre: string;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => MovieRatings, rating => rating.movie)
  ratings: MovieRatings[];

}
