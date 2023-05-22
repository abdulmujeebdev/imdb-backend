import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRatingColumnMovie1684654239287 implements MigrationInterface {
    name = 'ChangeRatingColumnMovie1684654239287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`rating\` \`rating\` decimal(5,2) NOT NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`rating\` \`rating\` decimal(20,6) NOT NULL DEFAULT '0.000000'`);
    }

}
