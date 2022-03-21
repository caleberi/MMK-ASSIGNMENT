
import logger from "jet-logger";
import { join } from "path";
import { DataSource,DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
    "type": "postgres",
    "url":process.env.DATABASE_URL,
    "synchronize": process.env.NODE_ENV==="production"?false:true,
    "logging": process.env.NODE_ENV==="production"?false:true,
    "entities": [
        "src/entity/**/*.{ts,js}",
        join(__dirname,'src/entity/', '**', '*{.ts,.js}')
    ],
    "migrations": [
       "src/migration/**/*.{ts,js}"
    ],
    "cli": {
        "entitiesDir":"src/entity",
        "migrationsDir": "src/migration"
    }
 }
const dataSource =  new DataSource(options);

dataSource
    .initialize()
    .then(async (connection) => {
        await connection.runMigrations();
        logger.info("Data Source has been initialized!")
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        logger.err("Error during Data Source initialization:", err)
    })

export default dataSource;