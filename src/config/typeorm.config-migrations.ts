import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    migrationsTableName: 'migrations',
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: "valet",
    password: "cc",
    database: "imdb_backend",
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['src/database/migrations/**/*{.ts,.js}'],
};

export default config;