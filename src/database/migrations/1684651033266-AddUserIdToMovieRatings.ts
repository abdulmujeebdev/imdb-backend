import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToMovieRatings1684651033266 implements MigrationInterface {
    name = 'AddUserIdToMovieRatings1684651033266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` ADD CONSTRAINT \`FK_46050fb39019ac7b8c8cbb701b0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` DROP FOREIGN KEY \`FK_46050fb39019ac7b8c8cbb701b0\``);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` DROP COLUMN \`userId\``);
    }

}
