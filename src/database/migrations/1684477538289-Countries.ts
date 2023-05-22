import { MigrationInterface, QueryRunner } from "typeorm";

export class Countries1684477538289 implements MigrationInterface {
    name = 'Countries1684477538289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` DROP FOREIGN KEY \`FK_3b9100120bf30e0e4197c4209e4\``);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` CHANGE \`movie_id\` \`movieId\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`countries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`country\``);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` ADD CONSTRAINT \`FK_0e86b04e47bb579a009a044f721\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` DROP FOREIGN KEY \`FK_0e86b04e47bb579a009a044f721\``);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`country\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`countries\``);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` CHANGE \`movieId\` \`movie_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` ADD CONSTRAINT \`FK_3b9100120bf30e0e4197c4209e4\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
