import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';
import { Genre } from './genre.entity';

@Entity()
export class Countries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  code: string;

  @OneToMany(() => Movie, movie => movie.country)
  movies: Movie[];

  @ManyToMany(() => Genre, genre => genre.movies)
  genre: Genre[];

}