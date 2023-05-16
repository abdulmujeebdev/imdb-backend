import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieRatingsForeignKey1684204808482 implements MigrationInterface {
    name = 'MovieRatingsForeignKey1684204808482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_0e86b04e47bb579a009a044f721\` ON \`movie_ratings\``);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` CHANGE \`movieId\` \`movie_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` CHANGE \`movie_id\` \`movie_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` ADD CONSTRAINT \`FK_3b9100120bf30e0e4197c4209e4\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` DROP FOREIGN KEY \`FK_3b9100120bf30e0e4197c4209e4\``);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` CHANGE \`movie_id\` \`movie_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` CHANGE \`movie_id\` \`movieId\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_0e86b04e47bb579a009a044f721\` ON \`movie_ratings\` (\`movieId\`)`);
    }

}
