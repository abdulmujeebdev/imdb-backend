import { DataSource } from "typeorm"
import dbConfig from "./typeorm.config-migrations";

const AppDataSource = new DataSource(dbConfig)

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
export default AppDataSource;