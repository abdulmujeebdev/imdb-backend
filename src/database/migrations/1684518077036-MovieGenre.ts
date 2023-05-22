import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieGenre1684518077036 implements MigrationInterface {
    name = 'MovieGenre1684518077036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_genre_genre\` (\`movieId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_3a4b81efbd4fdd362fd1187fac\` (\`movieId\`), INDEX \`IDX_ab0be65b579c5b4a70d9b676c5\` (\`genreId\`), PRIMARY KEY (\`movieId\`, \`genreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`genre\``);
        await queryRunner.query(`ALTER TABLE \`movie_genre_genre\` ADD CONSTRAINT \`FK_3a4b81efbd4fdd362fd1187facb\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movie_genre_genre\` ADD CONSTRAINT \`FK_ab0be65b579c5b4a70d9b676c54\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_genre_genre\` DROP FOREIGN KEY \`FK_ab0be65b579c5b4a70d9b676c54\``);
        await queryRunner.query(`ALTER TABLE \`movie_genre_genre\` DROP FOREIGN KEY \`FK_3a4b81efbd4fdd362fd1187facb\``);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`genre\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_ab0be65b579c5b4a70d9b676c5\` ON \`movie_genre_genre\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a4b81efbd4fdd362fd1187fac\` ON \`movie_genre_genre\``);
        await queryRunner.query(`DROP TABLE \`movie_genre_genre\``);
        await queryRunner.query(`DROP TABLE \`genre\``);
    }

}
