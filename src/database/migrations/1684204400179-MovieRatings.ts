import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieRatings1684204400179 implements MigrationInterface {
    name = 'MovieRatings1684204400179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie_ratings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`comments\` varchar(255) NULL, \`movieId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` ADD CONSTRAINT \`FK_0e86b04e47bb579a009a044f721\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` DROP FOREIGN KEY \`FK_0e86b04e47bb579a009a044f721\``);
        await queryRunner.query(`DROP TABLE \`movie_ratings\``);
    }

}
