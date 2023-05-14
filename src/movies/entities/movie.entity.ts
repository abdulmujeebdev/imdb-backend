import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
