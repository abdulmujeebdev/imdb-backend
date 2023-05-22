import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { MovieRatings } from './movieRatings.entity';
import { Countries } from './countries.entity';
import { Genre } from './genre.entity';

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

  @Column({ nullable: true })
  photo: string;

  @Column({ default: 0.0, type: 'decimal', precision: 5, scale: 2 })
  rating: number;

  @OneToMany(() => MovieRatings, rating => rating.movie)
  ratings: MovieRatings[];

  @ManyToOne(() => Countries, countries => countries.movies, { nullable: false })
  @JoinColumn()
  country: Countries;

  @ManyToMany(() => Genre, genre => genre.movies)
  @JoinTable()
  genre: Genre[];

}
