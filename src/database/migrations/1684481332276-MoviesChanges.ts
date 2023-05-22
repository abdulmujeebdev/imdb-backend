import { MigrationInterface, QueryRunner } from "typeorm";

export class MoviesChanges1684481332276 implements MigrationInterface {
    name = 'MoviesChanges1684481332276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP FOREIGN KEY \`FK_e9836b5713955c3b78d9821ca2e\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9836b5713955c3b78d9821ca2\` ON \`movie\``);
        await queryRunner.query(`DROP INDEX \`REL_e9836b5713955c3b78d9821ca2\` ON \`movie\``);
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`country_id\` \`countryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`countryId\` \`countryId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD CONSTRAINT \`FK_d50440a06b840526d7edec26ac4\` FOREIGN KEY (\`countryId\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP FOREIGN KEY \`FK_d50440a06b840526d7edec26ac4\``);
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`countryId\` \`countryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movie\` CHANGE \`countryId\` \`country_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e9836b5713955c3b78d9821ca2\` ON \`movie\` (\`country_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e9836b5713955c3b78d9821ca2\` ON \`movie\` (\`country_id\`)`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD CONSTRAINT \`FK_e9836b5713955c3b78d9821ca2e\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
