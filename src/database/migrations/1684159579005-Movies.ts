import { MigrationInterface, QueryRunner } from "typeorm";

export class Movies1684159579005 implements MigrationInterface {
    name = 'Movies1684159579005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`release_date\` varchar(255) NOT NULL, \`ticket_price\` int NOT NULL, \`country\` varchar(255) NOT NULL, \`genre\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`movie\``);
    }

}
