import { MigrationInterface, QueryRunner } from "typeorm";

export class AddScoreToMovieGenre1684577719648 implements MigrationInterface {
    name = 'AddScoreToMovieGenre1684577719648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`genre\` ADD \`score\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`rating\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`rating\``);
        await queryRunner.query(`ALTER TABLE \`genre\` DROP COLUMN \`score\``);
    }

}
