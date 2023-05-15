import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: "mujeeb",
  password: "Aqua11212211!",
  database: "imdb_backend",
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
export default AppDataSource;