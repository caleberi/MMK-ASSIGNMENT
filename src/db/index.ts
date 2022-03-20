
import logger from "jet-logger";
import { DataSource,DataSourceOptions } from "typeorm";

const options = {
    "type": "postgres",
    "port": process.env.DB_PORT||5432,
    "username": process.env.DB_USERNAME||"postgres",
    "password": process.env.DB_PASSWORD||"postgres",
    "database": process.env.DB_NAME||"postgres",
    "synchronize": process.env.NODE_ENV==="production"?false:true,
    "logging": process.env.NODE_ENV==="production"?false:true,
    "entities": [
       "src/entity/**/*.{ts,js}"
    ],
    "migrations": [
       "src/migration/**/*.{ts,js}"
    ]
 }
const dataSource =  new DataSource(<DataSourceOptions>options);

dataSource
    .initialize()
    .then(() => {
        logger.info("Data Source has been initialized!")
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        logger.err("Error during Data Source initialization:", err)
    })

export default dataSource;