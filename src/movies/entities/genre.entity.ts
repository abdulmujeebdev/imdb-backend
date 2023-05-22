import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  score: number;

  @ManyToMany(() => Movie, movie => movie.genre)
  movies: Movie[];

}