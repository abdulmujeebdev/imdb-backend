import { MigrationInterface, QueryRunner } from "typeorm";

export class Movies1684441869719 implements MigrationInterface {
    name = 'Movies1684441869719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie_ratings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`comments\` varchar(255) NULL, \`movie_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`release_date\` varchar(255) NOT NULL, \`ticket_price\` int NOT NULL, \`country\` varchar(255) NOT NULL, \`genre\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` ADD CONSTRAINT \`FK_3b9100120bf30e0e4197c4209e4\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_ratings\` DROP FOREIGN KEY \`FK_3b9100120bf30e0e4197c4209e4\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`movie\``);
        await queryRunner.query(`DROP TABLE \`movie_ratings\``);
    }

}
