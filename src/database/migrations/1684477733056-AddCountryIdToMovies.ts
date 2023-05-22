import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountryIdToMovies1684477733056 implements MigrationInterface {
    name = 'AddCountryIdToMovies1684477733056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` ADD \`country_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD UNIQUE INDEX \`IDX_e9836b5713955c3b78d9821ca2\` (\`country_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e9836b5713955c3b78d9821ca2\` ON \`movie\` (\`country_id\`)`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD CONSTRAINT \`FK_e9836b5713955c3b78d9821ca2e\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP FOREIGN KEY \`FK_e9836b5713955c3b78d9821ca2e\``);
        await queryRunner.query(`DROP INDEX \`REL_e9836b5713955c3b78d9821ca2\` ON \`movie\``);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP INDEX \`IDX_e9836b5713955c3b78d9821ca2\``);
        await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`country_id\``);
    }

}
